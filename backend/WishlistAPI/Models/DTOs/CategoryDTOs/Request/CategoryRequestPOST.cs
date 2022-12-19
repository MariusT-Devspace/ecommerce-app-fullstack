using System.ComponentModel.DataAnnotations;
using WishlistAPI.Models.DataModels;

namespace WishlistAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryRequestPOST { 
        public string Name { get; set; } = string.Empty;
    }
}
