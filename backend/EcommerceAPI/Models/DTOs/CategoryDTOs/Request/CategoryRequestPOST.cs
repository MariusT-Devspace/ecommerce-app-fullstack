using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryRequestPOST { 
        public string Name { get; set; } = string.Empty;
    }
}
