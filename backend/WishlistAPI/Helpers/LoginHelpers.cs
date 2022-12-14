using System.ComponentModel.DataAnnotations;

namespace WishlistAPI.Helpers
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
