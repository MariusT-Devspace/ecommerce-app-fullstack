﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Models;
using EcommerceAPI.Helpers;
using EcommerceAPI.Identity;
using EcommerceAPI.Models.DataModels;
using Serilog.Context;
using Microsoft.AspNetCore.Identity;

namespace EcommerceAPI.Controllers
{
    [Route("[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(
            EcommerceDBContext dBContext, JwtSettings jwtSettings, 
            ILogger<AccountController> logger, IHttpContextAccessor contextAccessor
        ) : ControllerBase
    {
        [HttpPost("Login")]
        public async Task<ActionResult<IEnumerable<UserToken>>> Login(Login login)
        {
            using (LogContext.PushProperty("{Controller}", nameof(AccountController)))
            using (LogContext.PushProperty("{ActionMethod}", nameof(Login)))
            {
                try
                {
                    logger.LogInformation("API request: {Controller} - {ActionMethod}");
                    logger.LogInformation("Request info: {@Headers}", contextAccessor.HttpContext?.Request.Headers);

                    if (dBContext.Users == null)
                    {
                        return NotFound();
                    }

                    bool isValidUsername;
                    bool isValidPassword = false;

                    // Verify login input
                    if (LoginHelpers.IsEmail(login.Identifier))
                        isValidUsername = await dBContext.Users.AnyAsync(user => user.EmailNormalized.Equals(login.Identifier.ToUpperInvariant()));
                    else
                        isValidUsername = await dBContext.Users.AnyAsync(user => user.UserNameNormalized.Equals(login.Identifier.ToUpperInvariant()));

                    User? user;
                    string badRequestMessage = "Wrong username or password";

                    // If username valid, verify password hash
                    if (isValidUsername)
                    {
                        logger.LogInformation("{Controller} - {ActionMethod}: Username {Username} is valid", login.Identifier);

                        if (LoginHelpers.IsEmail(login.Identifier))
                            user = await dBContext.Users.SingleOrDefaultAsync(user => user.EmailNormalized.Equals(login.Identifier.ToUpperInvariant()));
                        else
                            user = await dBContext.Users.SingleOrDefaultAsync(user => user.UserNameNormalized.Equals(login.Identifier.ToUpperInvariant()));

                        ;
                        logger.LogDebug("{Controller} - {ActionMethod}: Password is valid: {isValidPassword}", isValidPassword);

                        // If both username and password are valid, return a token
                        isValidPassword = PasswordHasher.VerifyPassword(user!, user.PasswordHash, login.Password) == PasswordVerificationResult.Success ||
                                          PasswordHasher.VerifyPassword(user!, user.PasswordHash, login.Password) == PasswordVerificationResult.SuccessRehashNeeded;
                        
                        if (isValidPassword)
                        {
                            if (PasswordHasher.VerifyPassword(user, user.PasswordHash, login.Password) == PasswordVerificationResult.SuccessRehashNeeded)
                            {
                                user.PasswordHash = PasswordHasher.HashPassword(user, login.Password);
                                dBContext.Entry(user).State = EntityState.Modified;
                                await dBContext.SaveChangesAsync();
                            }

                            logger.LogInformation("{Controller} - {ActionMethod}: User login credentials are valid, creating token...");

                            DateTime expiration = DateTime.UtcNow.AddDays(1);
                            string message = $"Welcome back, {user.FirstName}";

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
                            token.Token = await token.GetTokenKey(jwtSettings);

                            return Ok(token);
                        }
                        else 
                        {
                            logger.LogError("{Controller} - {ActionMethod}: Password is not valid");
                            return BadRequest(badRequestMessage);
                        }
                    }
                    else
                    {
                        logger.LogError("{Controller} - {ActionMethod}: Username {Username} is not valid", login.Identifier);
                        return BadRequest(badRequestMessage);
                    }

                }
                catch (Exception ex)
                {
                    logger.LogError("{Controller} - {ActionMethod}: Error trying to log in: {Message}", ex.Message);
                    logger.LogError("{Controller} - {ActionMethod}: Inner exception: {InnerException}", ex.InnerException);
                    logger.LogError("{Controller} - {ActionMethod}: Stack trace: {StackTrace}", ex.StackTrace);
                    throw new Exception("Login error", ex);
                }
            }
        }

        [HttpPost("SetToken")]
        public IActionResult SetToken()
        {
           
            try
            {
                var authorizationHeader = Request.Headers["Authorization"];
                if (authorizationHeader.Count > 0)
                {
                    var token = authorizationHeader[0].Substring("Bearer ".Length);
                    logger.LogInformation("Token: {Token}: ", token);
                    Response.Cookies.Append("auth_token", token, new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.None,
                        Secure = true
                    });
                }
                
                return Ok();
            }
            catch(Exception ex)
            {
                throw new Exception("Error setting token cookie: ", ex);
            }
            
        }

        [HttpGet("CheckCookie")]
        public IActionResult CheckCookie()
        {
            try
            {
                if (Request.Cookies.ContainsKey("auth_token"))
                {
                    logger.LogInformation("Cookies contain auth_token key: {ContainsKey}: ", Request.Cookies.ContainsKey("auth_token"));
                    logger.LogInformation("Request cookies: {RequestCookies}: ", Request.Cookies);
                    return Ok(new { authenticated = true });
                }
                else
                {
                    logger.LogInformation("Cookies contain auth_token key: {ContainsKey}: ", Request.Cookies.ContainsKey("auth_token"));
                    return Ok(new { authenticated = false });
                }
            }
            catch(Exception ex)
            {
                logger.LogError("Error checking token cookie: {Exception}", ex);
                throw new Exception("Error checking token cookie: ", ex);
            }
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            // Delete the JWT cookie
            HttpContext.Response.Cookies.Delete("auth_token");

            return Ok();
        }

        [HttpPost("Register")]
        public async Task<ActionResult<IEnumerable<UserToken>>> Register(Register register)
        {
            using (LogContext.PushProperty("{Controller}", nameof(AccountController)))
            using (LogContext.PushProperty("{ActionMethod}", nameof(Register)))
            {
                try
                {
                    logger.LogInformation("API request: {Controller} - {ActionMethod}");
                    logger.LogInformation("Request info: {Headers}", contextAccessor.HttpContext?.Request.Headers);

                    if (dBContext.Users == null)
                    {
                        return NotFound();
                    }

                    // Register user if all required fields are correctly filled
                    if (ModelState.IsValid)
                    {
                        // Check if username already exists
                        logger.LogInformation("{Controller} - {ActionMethod}: Check username: {Username}",register.Username);
                        var userNameAlreadyExists = await dBContext.Users.AnyAsync(user => user.UserNameNormalized.Equals(register.Username.ToUpperInvariant()));
                        if (userNameAlreadyExists)
                        {
                            logger.LogError("{Controller} - {ActionMethod}: Username {Username} already exists", register.Username);
                            return BadRequest("This username already exists");
                        }

                        // Check if email is already registered
                        logger.LogInformation("{Controller} - {ActionMethod}: Check email: {Username}", register.Email);
                        var emailAlreadyExists = await dBContext.Users.AnyAsync(user => user.EmailNormalized.Equals(register.Email.ToUpperInvariant()));
                        if (emailAlreadyExists)
                        {
                            logger.LogError("{Controller} - {ActionMethod}: Email address {Email} is already registered", register.Email);
                            return BadRequest("This email is already registered");
                        }

                        logger.LogInformation("{Controller} - {ActionMethod}: Create new user: {Username}", register.Username);
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
                        dBContext.Users.Add(user);
                        await dBContext.SaveChangesAsync();
                        logger.LogInformation("{Controller} - {ActionMethod}: New user {Username} saved in the database", register.Username);


                        // Login registered user
                        logger.LogInformation("{Controller} - {ActionMethod}: Login request");
                        return await Login(new Login()
                        {
                            Identifier = register.Username,
                            Password = register.Password
                        });
                    }
                    else
                    {
                        // Return BadRequest with the ModelState containing the invalid fields
                        // if user failed to correctly fill up the sign up form
                        logger.LogError("{Controller} - {ActionMethod}: User failed to fill all required fields correctly");
                        return BadRequest(ModelState);
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError("{Controller} - {ActionMethod}: Error trying to log in: {Message}", ex.Message);
                    logger.LogError("{Controller} - {ActionMethod}: Inner exception: {InnerException}", ex.InnerException);
                    logger.LogError("{Controller} - {ActionMethod}: Stack trace: {StackTrace}", ex.StackTrace);
                    throw new Exception("Register error", ex);
                }
            }
        }
    }
}
