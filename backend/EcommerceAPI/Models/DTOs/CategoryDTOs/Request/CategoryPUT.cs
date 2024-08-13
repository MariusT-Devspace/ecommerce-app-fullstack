using EcommerceAPI.Models.DataModels;
using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Models.DTOs.CategoryDTOs.Request
{
    [MetadataType(typeof(Category))]
    public class CategoryPUT
    {
        private string _name;

        public int Id { get; set; }
        public string Name 
        { 
            get => _name;
            set
            {
                _name = value.Trim();
            }
        }
    }
}
