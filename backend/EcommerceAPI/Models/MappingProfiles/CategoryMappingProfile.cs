using EcommerceAPI.Models.DataModels;
using AutoMapper;
using EcommerceAPI.Models.DTOs.CategoryDTOs;
using EcommerceAPI.Models.DTOs.CategoryDTOs.Request;

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
