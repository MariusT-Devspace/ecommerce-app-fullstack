using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;
using PasswordVerificationResult = Microsoft.AspNetCore.Identity.PasswordVerificationResult;

namespace EcommerceAPI.Identity
{
    public static class PasswordHasher
    {
        public static string HashPassword(IUser user, string password)
        {
            var passwordHasher = new PasswordHasher<IUser>();
            string hashedPassword = passwordHasher.HashPassword(user, password);
            return hashedPassword;
        }

        public static PasswordVerificationResult VerifyPassword(IUser user, string hashedPassword, string password)
        {
            var passwordHasher = new PasswordHasher<IUser>();
            var result = passwordHasher.VerifyHashedPassword(user, hashedPassword, password);
            Debug.WriteLine($"Current hashed password: {hashedPassword}");
            Debug.WriteLine($"Rehashed password: {HashPassword(user, password)}");

            return PasswordVerificationResult.Success;
        }
    }
}
