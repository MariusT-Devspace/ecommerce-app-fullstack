using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Services.Classes
{
    public class CategoriesService(EcommerceDBContext dBContext, ILogger<CategoriesService> logger) : ICategoriesService
    {
        public async Task<Category> GetCategoryBySlugAsync(string slug)
        {
            return await (from category in dBContext.Categories
                            where category.Slug == slug
                            select category).SingleAsync<Category>();
        }
    }
}
