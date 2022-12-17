using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Models.DataModels
{
    public class Category : BaseEntity
    {
        [Required, StringLength(50)]
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
