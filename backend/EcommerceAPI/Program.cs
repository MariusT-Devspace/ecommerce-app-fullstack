using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.Text.Json.Serialization;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

Environment.SetEnvironmentVariable("VaultURI", builder.Configuration["VaultURIString"]);
Uri? keyVaultEndpoint = null;
if (builder.Environment.IsProduction())
{
    keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultURI"));
    builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());
}

// Add services to the container.

// Add Automapper service
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Define the Security for authorization
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization Header using Bearer Scheme",
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

string connectionStringSecretValue = string.Empty;
string connectionString = string.Empty;
SecretClient? secretClient = null;

if (builder.Environment.IsProduction())
{
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

    secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential(), options);
    KeyVaultSecret connectionStringSecret = await secretClient.GetSecretAsync("WishlistAPIConnectionString");
    connectionStringSecretValue = connectionStringSecret.Value;
    connectionString = connectionStringSecretValue;
} 
else
{
    // Connection with local SQL Server
    const string LOCALCONNECTIONNAME = "WishlistDB";
    var localConnectionString = builder.Configuration.GetConnectionString(LOCALCONNECTIONNAME);
    connectionString = localConnectionString;
}



    

builder.Services.AddDbContext<EcommerceDBContext>(options => options.UseSqlServer(connectionString));


// Configure Serilog
var loggerConnectionString = connectionString;

builder.Host.UseSerilog((hostBuilderCtx, loggerConf) =>
{
    loggerConf.WriteTo.Console()
              .WriteTo.Debug()
              .WriteTo.MSSqlServer(
                  connectionString: connectionString,
                  sinkOptions: new MSSqlServerSinkOptions()
                  {
                      SchemaName = "EventLogging",
                      TableName = "Logs",
                      AutoCreateSqlTable = true,
                      BatchPostingLimit = 1000,
                      BatchPeriod = new TimeSpan(0, 0, 30)
                  }
              )
              .ReadFrom.Configuration(hostBuilderCtx.Configuration);
});

// Add HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Get IssuerSigningKey secret

if (builder.Environment.IsProduction())
{
    KeyVaultSecret issuerSigningKey = await secretClient.GetSecretAsync("WishlistAPIJwtIssuerSigningKey");
    var issuerSigningKeyValue = issuerSigningKey.Value;
    Environment.SetEnvironmentVariable("IssuerSigningKey", issuerSigningKeyValue);
}
else
{
    var issuerSigningKeyBytes = System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JwtKeys:IssuerSigningKey"]);
    Environment.SetEnvironmentVariable("IssuerSigningKey", Convert.ToBase64String(issuerSigningKeyBytes));
}
    


// Add JWT Authorization service
builder.Services.AddJwtServices(builder.Configuration, builder.Environment, secretClient);

// Set JWT Issuer based on environment
if (builder.Environment.IsDevelopment())
    Environment.SetEnvironmentVariable("Issuer", "https://localhost:7201");
else
    Environment.SetEnvironmentVariable("Issuer", "https://wishlist-api.azurewebsites.net");

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin();
        builder.WithOrigins("https://localhost:4200");
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Tell app to use Serilog
app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseAuthorization();

// Tell app to use CORS
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
