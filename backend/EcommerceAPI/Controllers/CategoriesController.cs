using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;
using Microsoft.AspNetCore.Mvc;
using EcommerceAPI.Models.DTOs.CategoryDTOs.Request;
using EcommerceAPI.Utils;
using EcommerceAPI.Models.DTOs.CategoryDTOs;
using System.Net;
using Microsoft.Data.SqlClient;
using EcommerceAPI.Services.Interfaces;

namespace EcommerceAPI.Controllers
{
    [Route("[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(
            EcommerceDBContext dbContext, IMapper mapper,
            ILogger<CategoriesController> logger, IHttpContextAccessor contextAccessor,
            ICategoriesService categoriesService
        ) : ControllerBase
    {
        // GET: Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetCategories()
        {
            if (dbContext.Categories == null)
            {
                return NotFound();
            }

            var categories = await dbContext.Categories.ToListAsync();
            var categoriesResponse = mapper.Map<IEnumerable<CategoryResponse>>(categories);

            return Ok(categoriesResponse);
        }

        // GET: Categories/electronics
        [HttpGet("{slug}")]
        public async Task<ActionResult<CategoryResponse>> GetCategory(string slug)
        {
            if (dbContext.Categories == null)
            {
                return NotFound();
            }

            var category = await categoriesService.GetCategoryBySlugAsync(slug);

            if (category == null)
            {
                return NotFound();
            }

            var categoryResponse = mapper.Map<CategoryResponse>(category);
            return Ok(categoryResponse);
        }

        // PUT: Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] CategoryPUT categoryRequest)
        {
            if (dbContext.Categories == null)
            {
                return NotFound();
            }

            if (id != categoryRequest.Id)
            {
                return BadRequest("Id does not match.");
            }

            var category = await dbContext.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            // Handle empty category name
            if (string.IsNullOrEmpty(categoryRequest.Name))
            {
                logger.LogError("Category name validation failed. Null or empty values not allowed");
                return BadRequest("Category name validation failed. Null or empty values not allowed");
            }

            if (categoryRequest.Name == category.Name)
            {
                return BadRequest("New category name must be different than the current one");
            }

            // Handle conflicts
            var newSlug = StringUtils.ToSlug(categoryRequest.Name);
            if (await dbContext.Categories.AnyAsync(c => c.Id != categoryRequest.Id && c.Slug == newSlug))
            {
                return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
            }

            mapper.Map(categoryRequest, category);
            dbContext.Entry(category).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && (sqlEx.Number == 2627 || sqlEx.Number == 2601))
                {
                    return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
                }
                else
                {
                    throw;
                }
            }

            return Ok(mapper.Map<CategoryResponse>(category));
        }

        // POST: Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Category>> PostCategory(CategoryPOST categoryRequest)
        {
            logger.LogInformation("API request: {@Controller} - {@ActionMethod}", nameof(CategoriesController), nameof(PostCategory));
            logger.LogInformation("Request info: {@Headers}", contextAccessor.HttpContext?.Request.Headers);
            logger.LogInformation("Request info: {@Body}", contextAccessor.HttpContext?.Request.Body);
            logger.LogInformation("Request body: {@RequestBody}", categoryRequest);


            if (dbContext.Categories == null)
            {
                return NotFound();
            }


            // Handle empty category name
            if (string.IsNullOrEmpty(categoryRequest.Name))
            {
                logger.LogError("New category validation failed. Null or empty values not allowed");
                return BadRequest("New category validation failed. Null or empty values not allowed");
            }

            // Handle conflicts
            if (CategoryExists(StringUtils.ToSlug(categoryRequest.Name)))
            {
                return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
            }

            var category = mapper.Map<Category>(categoryRequest);

            dbContext.Categories.Add(category);

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && (sqlEx.Number == 2627 || sqlEx.Number == 2601))
                {
                    return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
                }
                else
                {
                    throw;
                }
            }

            var categoryResponse = mapper.Map<CategoryResponse>(category);

            return CreatedAtAction(nameof(PostCategory), new { id = categoryResponse.Id }, categoryResponse);
        }

        // DELETE: Categories/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (dbContext.Categories == null)
            {
                return NotFound();
            }

            var category = await dbContext.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(object identifier)
        {
            return identifier is int id 
                   ? dbContext.Categories!.Any(category => category.Id == id)
                   : identifier is string slug
                   ? dbContext.Categories!.Any(category => category.Slug == slug)
                   : throw new ArgumentException("Input must be either an integer or a string");
        }
    }
}
