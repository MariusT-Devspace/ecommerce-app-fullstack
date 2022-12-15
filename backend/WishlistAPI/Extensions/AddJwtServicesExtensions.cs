using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using WishlistAPI.Models;
using ILogger = Serilog.ILogger;

namespace WishlistAPI.Extensions
{
    public static class AddJwtServicesExtension
    {
        private static readonly ILogger logger = Log.ForContext(typeof(AddJwtServicesExtension));
        public static void AddJwtServices(this IServiceCollection services, IConfiguration configuration, 
                                            IWebHostEnvironment environment, SecretClient secretClient)
        {
            // Add JWT Settings
            logger.Information("{Class} - {Method}: Binding Jwt settings...", "AddJwtServicesExtension", "AddJwtServices");
            var bindJwtSettings = new JwtSettings();
            configuration.Bind("JwtKeys", bindJwtSettings);

            // Add JWT settings singleton
            services.AddSingleton(bindJwtSettings);

            // Get IssuerSigningKey secret
            KeyVaultSecret issuerSigningKeySecret = secretClient.GetSecret("WishlistAPIJwtIssuerSigningKey");
            var issuerSigningKeySecretValue = Convert.FromBase64String(issuerSigningKeySecret.Value);

            // Add jwt bearer authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                if (environment.IsDevelopment())
                    options.RequireHttpsMetadata = true;
                else
                    options.RequireHttpsMetadata = false;

                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = bindJwtSettings.ValidateIssuerSigningKey,
                    IssuerSigningKey = new SymmetricSecurityKey(issuerSigningKeySecretValue),
                    ValidateIssuer = bindJwtSettings.ValidateIssuer,
                    ValidIssuers = bindJwtSettings.ValidIssuers,
                    ValidateAudience = bindJwtSettings.ValidateAudience,
                    ValidAudience = bindJwtSettings.ValidAudience,
                    RequireExpirationTime = bindJwtSettings.RequireExpirationTime,
                    ValidateLifetime = bindJwtSettings.ValidateLifeTime,
                    ClockSkew = TimeSpan.FromDays(1)
                };
            });
        }
    }
}
