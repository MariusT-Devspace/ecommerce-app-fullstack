using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Models
{
    public class Register
    {
        [Required, StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        [StringLength(100, ErrorMessage = "The email address must be 100 characters long or less")]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(20, MinimumLength = 3, ErrorMessage = "The user name must be between {2} and {1} characters long")]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
