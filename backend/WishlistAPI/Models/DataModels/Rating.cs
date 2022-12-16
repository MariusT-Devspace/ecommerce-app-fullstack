using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Models.DataModels
{
    public class Rating : BaseEntity
    {
        [Required]
        [RegularExpression(@"^\d(\.\d{1})?$")]
        [Range(0, 5.0)]
        public float? Rate { get; set; }

        [Required]
        public int Count { get; set; } = 0;
    }
}
