using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.DataAccess
{
    public class EcommerceDBContext: DbContext
    {
        private readonly ILoggerFactory _loggerFactory;
        public EcommerceDBContext(DbContextOptions<EcommerceDBContext> options, ILoggerFactory loggerFactory): base(options) { 
            _loggerFactory = loggerFactory;
        }

        public DbSet<Product>? Products { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Rating>? Ratings { get; set; }
        public DbSet<User>? Users { get; set; }
        public DbSet<WishlistItem>? WishlistItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var logger = _loggerFactory.CreateLogger<EcommerceDBContext>();
            optionsBuilder.LogTo(d => logger.Log(LogLevel.Information, d, new[] { DbLoggerCategory.Database.Name }), LogLevel.Information)
                .EnableDetailedErrors();
        }
    }
}
