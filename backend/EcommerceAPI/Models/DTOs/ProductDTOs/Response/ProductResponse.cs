using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.ProductDTOs.Response
{
    [MetadataType(typeof(Product))]
    public class ProductResponse
    {
        public int Id { get; private set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Picture { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } = true;
        public int? RatingId { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedOn { get; private set; } = DateTime.Now;
    }
}
