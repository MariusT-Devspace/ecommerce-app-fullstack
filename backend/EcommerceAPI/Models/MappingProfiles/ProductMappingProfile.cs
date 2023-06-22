using AutoMapper;
using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Models.DTOs.ProductDTOs.Request;
using EcommerceAPI.Models.DTOs.ProductDTOs.Response;

namespace EcommerceAPI.Models.MappingProfiles
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
