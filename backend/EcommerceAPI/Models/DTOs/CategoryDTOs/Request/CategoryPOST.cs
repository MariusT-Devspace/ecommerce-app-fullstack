using EcommerceAPI.Models.DataModels;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryPOST
    {
        private string _name;
        public string Name {
            get => _name;
            set
            {
                _name = value.Trim();
            } 
        }
    }
}
