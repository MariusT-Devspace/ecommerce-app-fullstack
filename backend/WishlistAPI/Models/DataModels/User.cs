using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Models.DataModels
{
    public class User: BaseEntity
    {
        public enum UserRole
        {
            Administrator,
            User
        }

        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public UserRole? Role { get; set; }

        [Required]
        public ICollection<WishlistItem> Wishlist { get; set; } = new List<Product>();
        
    }
}
