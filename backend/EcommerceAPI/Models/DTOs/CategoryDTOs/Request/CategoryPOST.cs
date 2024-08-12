using EcommerceAPI.Models.DataModels;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryPOST
    {
        public string Name { get; set; } = string.Empty;
    }
}
