using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishlistAPI.DataAccess;
using WishlistAPI.Models;
using WishlistAPI.Helpers;
using WishlistAPI.Identity;
using WishlistAPI.Models.DataModels;
using static WishlistAPI.Models.DataModels.User;

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

        [HttpPost("Login")]
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
                    string passwordHash = PasswordHasher.HashPassword(user!, login.Password.ToString());
                    isValidPassword = PasswordHasher.VerifyPassword(user!, passwordHash, login.Password);
                    
                    // If both username and password are valid, return a token
                    if (isValidUsername && isValidPassword)
                    {
                        DateTime expiration = DateTime.UtcNow.AddDays(1);
                        string message = $"Welcome back, {user!.FirstName}";

                        UserToken token = new()
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

        [HttpPost("Register")]
        public async Task<ActionResult<IEnumerable<UserToken>>> Register(Register register)
        {
            try
            {
                if (_dBContext.Users == null)
                {
                    return NotFound();
                }
                
                // Register user if all required fields are correctly filled
                if (ModelState.IsValid)
                {
                    // Check if username already exists
                    var userNameAlreadyExists = await _dBContext.Users.AnyAsync(user => user.UserNameNormalized.Equals(register.Username.ToUpperInvariant()));
                    if (userNameAlreadyExists)
                        return BadRequest("This username already exists");

                    // Check if is already registered
                    var emailAlreadyExists = await _dBContext.Users.AnyAsync(user => user.EmailNormalized.Equals(register.Email.ToUpperInvariant()));
                    if (emailAlreadyExists)
                        return BadRequest("This email is already registered");

                    // Create new user
                    User user = new()
                    {
                        UserName = register.Username,
                        UserNameNormalized = register.Username.ToUpperInvariant(),
                        FirstName = register.FirstName,
                        LastName = register.LastName,
                        Email = register.Email,
                        EmailNormalized = register.Email.ToUpperInvariant(),
                    };
                    user.PasswordHash = PasswordHasher.HashPassword(user, register.Password);

                    // Save user in the database
                    _dBContext.Users.Add(user);
                    await _dBContext.SaveChangesAsync();

                    // Login registered user
                    return await Login(new Login() 
                    {
                        LoginInput = register.Username,
                        Password = register.Password
                    });
                }
                else
                {
                    // Return BadRequest with the ModelState containing the invalid fields
                    // if user failed to correctly fill up the sign up form
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Register error", ex);
            }
        }
    }
}
