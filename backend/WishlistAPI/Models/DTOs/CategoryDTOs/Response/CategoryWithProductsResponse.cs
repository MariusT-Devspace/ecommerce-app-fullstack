using System.ComponentModel.DataAnnotations;
using WishlistAPI.Models.DataModels;

namespace WishlistAPI.Models.DTOs.CategoryDTOs.Response
{
    [MetadataType(typeof(Category))]
    public class CategoryWithProductsResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<int> Products { get; set; } = new List<int>();
    }
}
