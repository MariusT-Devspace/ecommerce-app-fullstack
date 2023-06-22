using System.ComponentModel.DataAnnotations;

namespace EcommerceAPI.Helpers
{
    public class LoginHelpers
    {
        public static bool IsEmail(string input)
        {
            var attribute = new EmailAddressAttribute();
            if (attribute.IsValid(input))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
