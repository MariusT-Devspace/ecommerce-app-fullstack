namespace WishlistAPI.Models
{
    public class JwtSettings
    {
        public bool ValidateIssuerSigningKey { get; set; }
        public string IssuerSigningKey { get; set; } = string.Empty;

        public bool ValidateIssuer { get; set; }
        public string ValidIssuer { get; set; } = string.Empty;

        public bool ValidateAudience { get; set; }
        public string ValidAudience { get; set; } = string.Empty;

        public bool RequireExpirationTime { get; set; }
        public bool ValidateLifeTime { get; set; }
    }
}
