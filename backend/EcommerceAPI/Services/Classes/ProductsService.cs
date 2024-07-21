using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Services.Classes
{
    public class ProductsService : IProductsService
    {
        private readonly EcommerceDBContext _dbContext;
        private readonly ILogger<ProductsService> _logger;

        public ProductsService(EcommerceDBContext dbContext, ILogger<ProductsService> logger) 
        { 
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(string categoryName)
        {
            _logger.LogInformation("{Service} - {Method}", nameof(ProductsService), nameof(GetProductsByCategoryAsync));
            _logger.LogInformation("Category name: {categoryName}", categoryName);

            return await (from category in _dbContext.Categories
                          where category.Name == categoryName
                          select category.Products).SingleAsync<IEnumerable<Product>>();
        }
    }
}
