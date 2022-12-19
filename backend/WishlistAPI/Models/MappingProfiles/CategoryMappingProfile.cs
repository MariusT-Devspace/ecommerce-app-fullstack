using WishlistAPI.Models.DataModels;
using WishlistAPI.Models.DTOs.CategoryDTOs.Request;
using AutoMapper;
using WishlistAPI.Models.DTOs.CategoryDTOs.Response;

namespace WishlistAPI.Models.MappingProfiles
{
    public class CategoryMappingProfile: Profile
    {
        public CategoryMappingProfile() {
            CreateMap<CategoryRequestPOST, Category>();
            CreateMap<CategoryRequestPUT, Category>();
            CreateMap<Category, CategoryResponse>();
            CreateMap<Category, CategoryWithProductsResponse>();
        }
    }
}
