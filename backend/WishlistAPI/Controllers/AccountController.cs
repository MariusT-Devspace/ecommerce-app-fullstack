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

                bool validUsername;
                bool validPassword = false;                

                // Verify login input
                if (LoginHelpers.IsEmail(login.LoginInput))
                    validUsername = await _dBContext.Users.AnyAsync(user => user.Email.Equals(login));
                else
                    validUsername = await _dBContext.Users.AnyAsync(user => user.UserName.Equals(login));

                User? user;

                string badRequestMessage = "Wrong username or password";

                // If username valid, verify password hash
                if (validUsername)
                {
                    user = await _dBContext.Users.FirstOrDefaultAsync();
                    string hashedPassword = PasswordHasher.HashPassword(user, login.Password.ToString());
                    validPassword = await _dBContext.Users.AnyAsync(user => user.PasswordHash.Equals(hashedPassword));
                    
                    // If both username and password are valid, return a token
                    if (validUsername && validPassword)
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
