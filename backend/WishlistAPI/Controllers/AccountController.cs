using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishlistAPI.DataAccess;
using WishlistAPI.Models;
using WishlistAPI.Helpers;
using WishlistAPI.Identity;
using WishlistAPI.Models.DataModels;

namespace WishlistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly WishlistDBContext _dBContext;
        private readonly JwtSettings _jwtSettings;
        public AccountController(WishlistDBContext dBContext, JwtSettings jwtSettings) {
            _dBContext = dBContext;
            _jwtSettings = jwtSettings;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<UserToken>>> Login(Login login)
        {
            try
            {
                if (_dBContext.Users == null)
                {
                    return NotFound();
                }

                bool isValidUsername;
                bool isValidPassword = false;                

                // Verify login input
                if (LoginHelpers.IsEmail(login.LoginInput))
                    isValidUsername = await _dBContext.Users.AnyAsync(user => user.EmailNormalized.Equals(login.LoginInput.ToUpperInvariant()));
                else
                    isValidUsername = await _dBContext.Users.AnyAsync(user => user.UserNameNormalized.Equals(login.LoginInput.ToUpperInvariant()));

                User? user;

                string badRequestMessage = "Wrong username or password";

                // If username valid, verify password hash
                if (isValidUsername)
                {
                    user = await _dBContext.Users.FirstOrDefaultAsync(user => user.EmailNormalized.Equals(login.LoginInput.ToUpperInvariant()));
                    string passwordHash = PasswordHasher.HashPassword(user, login.Password.ToString());
                    isValidPassword = PasswordHasher.VerifyPassword(passwordHash, login.Password);
                    
                    // If both username and password are valid, return a token
                    if (isValidUsername && isValidPassword)
                    {
                        DateTime expiration = DateTime.UtcNow.AddDays(1);
                        string message = $"Welcome back, {user.FirstName}";

                        UserToken token = new UserToken()
                        {
                            UserId = user.Id,
                            UserName = user.UserName,
                            Email = user.Email,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Expiration = expiration,
                            Validity = expiration.TimeOfDay,
                            Role = user.Role,
                            WelcomeMessage = message
                        };
                        token.Token = token.GetTokenKey(_jwtSettings);

                        return Ok(token);
                    }
                    else
                    {
                        return BadRequest(badRequestMessage);
                    }
                }
                else
                {
                    return BadRequest(badRequestMessage);
                }

            }
            catch (Exception ex)
            {
                throw new Exception("Login error", ex);
            }
        }
    }
}
