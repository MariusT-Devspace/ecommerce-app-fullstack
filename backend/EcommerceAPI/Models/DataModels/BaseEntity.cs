
namespace EcommerceAPI.Models.DataModels
{
    public class BaseEntity
    {
        public int Id { get; private set; }
        public DateTime CreatedOn { get; private set; } = DateTime.Now;
        public DateTime UpdatedOn { get; private set; } = DateTime.Now;
        public DateTime? DeletedOn { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
