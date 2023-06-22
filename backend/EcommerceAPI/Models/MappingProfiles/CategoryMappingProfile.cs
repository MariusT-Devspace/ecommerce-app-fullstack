using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Models.DTOs.CategoryDTOs.Request;
using AutoMapper;
using EcommerceAPI.Models.DTOs.CategoryDTOs.Response;

namespace EcommerceAPI.Models.MappingProfiles
{
    public class CategoryMappingProfile: Profile
    {
        public CategoryMappingProfile() {
            CreateMap<CategoryRequestPOST, Category>();
            CreateMap<CategoryRequestPUT, Category>();
            CreateMap<Category, CategoryResponse>();
        }
    }
}
