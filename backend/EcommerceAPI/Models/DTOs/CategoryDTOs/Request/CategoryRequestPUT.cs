using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryRequestPUT
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
