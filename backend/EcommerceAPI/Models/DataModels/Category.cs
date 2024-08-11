using EcommerceAPI.Utils;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DataModels
{
    public class Category : BaseEntity
    {
        private string _name;
        private string _slug;

        [Required, StringLength(50, MinimumLength = 3, ErrorMessage = "Category name must be between 3 and 50 characters")]
        public string Name 
        { 
            get => _name; 
            set
            {
                _name = value;
                Slug = value;
            }
        }

        [Required, StringLength(50, MinimumLength = 3, ErrorMessage = "Category id must be between 3 and 50 characters")]
        public string Slug { 
            get => _slug; 
            set => _slug = StringUtils.ToSlug(value); 
        }

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
