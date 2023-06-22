using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Response
{
    [MetadataType(typeof(Category))]
    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
