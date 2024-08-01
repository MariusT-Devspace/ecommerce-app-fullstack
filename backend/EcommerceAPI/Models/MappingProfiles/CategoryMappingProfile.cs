using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Models.DTOs.CategoryDTOs;
using AutoMapper;

namespace EcommerceAPI.Models.MappingProfiles
{
    public class CategoryMappingProfile: Profile
    {
        public CategoryMappingProfile() {
            CreateMap<CategoryREST, Category>().ForMember(dest => dest.Id, act => act.Ignore())
                                               .ForMember(dest => dest.CategoryId, act => act.MapFrom(src => src.Id));  
            CreateMap<Category, CategoryREST>().ForMember(dest => dest.Id, act => act.MapFrom(src => src.CategoryId));
        }
    }
}
