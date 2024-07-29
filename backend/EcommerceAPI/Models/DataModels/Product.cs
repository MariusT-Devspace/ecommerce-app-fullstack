using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DataModels
{
    public class Product : BaseEntity
    {
        [Required, StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^\d+\.\d{2}$")]
        [Range(0, 99999999.99)]
        public decimal Price { get; set; }

        public string Picture { get; set; } = string.Empty;

        [Required]
        public bool IsAvailable { get; set; } = true;

        public int? RatingId { get; set; }
        public Rating? Rating { get; set; }

        [Required]
        public string? CategoryId { get; set; }
        public Category? Category { get; set; }

    }
}