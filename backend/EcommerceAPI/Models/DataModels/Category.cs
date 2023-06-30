using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DataModels
{
    public class Category : BaseEntity
    { 
        [Required, StringLength(50, MinimumLength = 3, ErrorMessage = "Category name must be between 3 and 50 characters")]
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
