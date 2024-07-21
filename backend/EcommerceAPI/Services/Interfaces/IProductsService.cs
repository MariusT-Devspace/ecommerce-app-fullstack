using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Services.Interfaces
{
    public interface IProductsService
    {
        Task<IEnumerable<Product>> GetProductsByCategoryAsync(string categoryName);
    }
}
