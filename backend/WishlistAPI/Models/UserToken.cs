using static WishlistAPI.Models.DataModels.User;

namespace WishlistAPI.Models
{
    public class UserToken
    {
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public TimeSpan Validity { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public UserRole? Role { get; set; }
        public string WelcomeMessage { get; set; } = string.Empty;
    }
}
