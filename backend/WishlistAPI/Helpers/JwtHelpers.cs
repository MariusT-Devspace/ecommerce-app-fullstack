using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WishlistAPI.Models;
using WishlistAPI.Models.DataModels;

namespace WishlistAPI.Helpers
{
    public static class JwtHelpers
    {
        public static IEnumerable<Claim> GetClaims(UserToken userToken)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("UserId", userToken.UserId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, userToken.UserName),
                new Claim(ClaimTypes.Email, userToken.Email),
                // Expires in 1 day
                new Claim(ClaimTypes.Expiration, userToken.Expiration.ToString("MMM ddd dd yyyy HH:mm:ss tt"))
            };

            if (userToken.Role == User.UserRole.Administrator)
            {
                claims.Add(new Claim(ClaimTypes.Role, User.UserRole.Administrator.ToString()));
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.Role, User.UserRole.User.ToString()));
            }

            return claims;
        }

        public static string GetTokenKey(this UserToken userToken, JwtSettings jwtSettings)
        {
            try
            {
                // Obtain secret key
                var key = System.Text.Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey);

                string issuer = Environment.GetEnvironmentVariable("Issuer") ?? jwtSettings.ValidIssuers[0];

                // Generate JWT
                var jwtToken = new JwtSecurityToken(
                    issuer: issuer,
                    audience: jwtSettings.ValidAudience,
                    claims: GetClaims(userToken),
                    notBefore: new DateTimeOffset(DateTime.Now).DateTime,
                    expires: new DateTimeOffset(userToken.Expiration).DateTime,
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256
                        )
                    );

                var token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                return token;
            }
            catch (Exception ex)
            {
                throw new Exception("Error generating the JWT", ex);
            }
        }
    }
}
