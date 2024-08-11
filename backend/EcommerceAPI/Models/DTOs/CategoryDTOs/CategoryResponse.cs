using EcommerceAPI.Models.DataModels;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs
{
    [MetadataType(typeof(Category))]
    public class CategoryResponse
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
    }
}
