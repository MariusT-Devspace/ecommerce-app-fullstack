using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Services.Interfaces
{
    public interface ICategoriesService
    {
        Task<Category> GetCategoryBySlugAsync(string slug);
    }
}
