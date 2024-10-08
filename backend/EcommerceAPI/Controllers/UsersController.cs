﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;

namespace EcommerceAPI.Controllers
{
    [Route("[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(EcommerceDBContext dbContext) : ControllerBase
    {
        // GET: Users
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            if (dbContext.Users == null)
            {
                return NotFound();
            }

            return await dbContext.Users.ToListAsync();
        }

        // GET: Users/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            if (dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            dbContext.Entry(user).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<User>> PostUser([FromBody] User user)
        {
            if (dbContext.Users == null)
            {
                return NotFound();
            }

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: Users/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return dbContext.Users!.Any(user => user.Id == id);
        }
    }
}
