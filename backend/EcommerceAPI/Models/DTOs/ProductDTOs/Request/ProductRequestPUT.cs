using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.ProductDTOs.Request
{
    [MetadataType(typeof(Product))]
    public class ProductRequestPUT
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Picture { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } = true;
        public int? CategoryId { get; set; }
    }
}
