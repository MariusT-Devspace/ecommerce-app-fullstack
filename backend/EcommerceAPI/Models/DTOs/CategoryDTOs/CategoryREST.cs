using System.ComponentModel.DataAnnotations;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs
{
    [MetadataType(typeof(Category))]
    public class CategoryREST
    { 
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
}
