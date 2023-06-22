using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models
{
    public class Login
    {
        [Required]
        public string Identifier { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
