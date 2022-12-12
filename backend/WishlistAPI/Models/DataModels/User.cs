using Microsoft.AspNet.Identity;
using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Models.DataModels
{
    public class User: IUser
    {
        public enum UserRole
        {
            Administrator,
            User
        }
        string IUser<string>.Id { get; } = string.Empty;

        [Required, StringLength(50)]
        string IUser<string>.UserName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public UserRole? Role { get; set; } = UserRole.User;

        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; } = false;

        public virtual ICollection<WishlistItem> Wishlist { get; set; } = new List<WishlistItem>();

    }
}
