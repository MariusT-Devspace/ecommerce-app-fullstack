using AutoMapper;
using WishlistAPI.Models.DataModels;
using WishlistAPI.Models.DTOs.ProductDTOs.Request;
using WishlistAPI.Models.DTOs.ProductDTOs.Response;

namespace WishlistAPI.Models.MappingProfiles
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile() {
            CreateMap<Product, ProductResponse>();
            CreateMap<ProductRequestPOST, Product>();
            CreateMap<ProductRequestPUT, Product>();
        }
    }
}
