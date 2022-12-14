using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
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
const string CONNECTIONNAME = "WishlistDB";
var connectionString = builder.Configuration.GetConnectionString(CONNECTIONNAME);

// Add DbContext
//builder.Services.AddDbContext<WishlistDBContext>(options => options.UseSqlServer(connectionStringSecretValue));
builder.Services.AddDbContext<WishlistDBContext>(options => options.UseSqlServer(connectionString));

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
