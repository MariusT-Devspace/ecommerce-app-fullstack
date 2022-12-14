using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WishlistAPI.Models;

namespace WishlistAPI.Extensions
{
    public static class AddJwtServicesExtension
    {
        public static void AddJwtServices(this IServiceCollection services, IConfiguration configuration, 
                                            IWebHostEnvironment environment, SecretClient secretClient)
        {
            // Add JWT Settings
            var bindJwtSettings = new JwtSettings();
            configuration.Bind("JwtKeys", bindJwtSettings);

            // Add JWT settings singleton
            services.AddSingleton(bindJwtSettings);

            // Get IssuerSigningKey secret
            var _secretClient = secretClient;
            KeyVaultSecret issuerSigningKeySecret = _secretClient.GetSecret("WishlistAPIJwtIssuerSigningKey");
            var issuerSigningKeySecretValue = issuerSigningKeySecret.Value;

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
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(issuerSigningKeySecretValue)),
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
