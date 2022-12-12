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

        [Key]
        public string Id { get; private set;  } = Guid.NewGuid().ToString();

        [Required, StringLength(20)]
        public string UserName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50)]  
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public UserRole? Role { get; private set; } = UserRole.User;

        public DateTime CreatedOn { get; private set; } = DateTime.Now;
        public DateTime UpdatedOn { get; private set; } = DateTime.Now;
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; } = false;

        public virtual ICollection<WishlistItem> Wishlist { get; set; } = new List<WishlistItem>();

    }
}
