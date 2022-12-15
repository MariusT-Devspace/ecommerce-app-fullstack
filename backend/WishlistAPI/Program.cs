using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using WishlistAPI.DataAccess;
using WishlistAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

//var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri"));
var keyVaultEndpoint = new Uri("https://wishlistapivault.vault.azure.net/");
builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

SecretClientOptions options = new SecretClientOptions()
{
    Retry =
        {
            Delay= TimeSpan.FromSeconds(2),
            MaxDelay = TimeSpan.FromSeconds(16),
            MaxRetries = 5,
            Mode = RetryMode.Exponential
         }
};

var secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential(), options);
KeyVaultSecret connectionStringSecret = secretClient.GetSecret("WishlistAPIConnectionString");
string connectionStringSecretValue = connectionStringSecret.Value;

// Connection with local SQL Server
const string LOCALCONNECTIONNAME = "WishlistDB";
var localConnectionString = builder.Configuration.GetConnectionString(LOCALCONNECTIONNAME);

// Add DbContext
//builder.Services.AddDbContext<WishlistDBContext>(options => options.UseSqlServer(connectionStringSecretValue));
builder.Services.AddDbContext<WishlistDBContext>(options => options.UseSqlServer(localConnectionString));

// Configure Serilog
var loggerConnectionString = string.Empty;
if (builder.Environment.IsDevelopment())
    loggerConnectionString = localConnectionString;
else
    loggerConnectionString = connectionStringSecretValue;

builder.Host.UseSerilog((hostBuilderCtx, loggerConf) =>
{
    loggerConf.WriteTo.Console()
              .WriteTo.Debug()
              .ReadFrom.Configuration(hostBuilderCtx.Configuration)
              .WriteTo.MSSqlServer(
                  connectionString: localConnectionString,
                  sinkOptions: new MSSqlServerSinkOptions()
                  {
                      SchemaName = "EventLogging",
                      TableName = "Logs",
                      AutoCreateSqlTable = true,
                      BatchPostingLimit = 1000,
                      BatchPeriod = new TimeSpan(0, 0, 30)
                  }
              );
});

// Add JWT Authorization service
builder.Services.AddJwtServices(builder.Configuration, builder.Environment, secretClient);

// Set JWT Issuer based on environment
if (builder.Environment.IsDevelopment())
    Environment.SetEnvironmentVariable("Issuer", "https://localhost:7118");
else
    Environment.SetEnvironmentVariable("Issuer", "https://wishlist-api.azurewebsites.net");

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
