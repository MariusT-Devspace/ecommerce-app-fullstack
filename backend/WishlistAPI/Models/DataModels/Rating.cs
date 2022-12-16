using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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



        // Properties excluded from parent class
        [NotMapped]
        public DateTime? DeletedOn { get; set; }

        [NotMapped]
        public bool IsDeleted { get; set; } = false;
    }
}
