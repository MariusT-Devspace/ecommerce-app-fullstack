using System.ComponentModel.DataAnnotations;
using WishlistAPI.Models.DataModels;

namespace WishlistAPI.Models.DTOs.ProductDTOs.Request
{
    [MetadataType(typeof(Product))]
    public class ProductRequestPOST
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Picture { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } = true;
        public int? CategoryId { get; set; }
    }
}
