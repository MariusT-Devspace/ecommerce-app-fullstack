using AutoMapper;
using WishlistAPI.Models.DataModels;
using WishlistAPI.Models.DTOs.Request;
using WishlistAPI.Models.DTOs.Response;

namespace WishlistAPI.Models.MappingProfiles
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile() {
            CreateMap<Product, ProductResponse>();
            CreateMap<ProductRequest, Product>();
        }
    }
}
