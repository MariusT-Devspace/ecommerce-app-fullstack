using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using PasswordVerificationResult = Microsoft.AspNetCore.Identity.PasswordVerificationResult;

namespace WishlistAPI.Identity
{
    public class PasswordHasher
    {
        public string HashPassword(IUser user, string password)
        {
            var passwordHasher = new PasswordHasher<IUser>();
            string hashedPassword = passwordHasher.HashPassword(user, password);
            return hashedPassword;
        }

        public bool VerifyPassword(IUser user, string password, string hashedPassword)
        {
            var passwordHasher = new PasswordHasher<IUser>();
            var result = passwordHasher.VerifyHashedPassword(user, hashedPassword, password);

            return result == PasswordVerificationResult.Success;
        }
    }
}
