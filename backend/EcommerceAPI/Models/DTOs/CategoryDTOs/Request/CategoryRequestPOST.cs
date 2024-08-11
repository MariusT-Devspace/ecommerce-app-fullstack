using EcommerceAPI.Models.DataModels;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryRequestPOST
    {
        public string Name { get; set; } = string.Empty;
    }
}
