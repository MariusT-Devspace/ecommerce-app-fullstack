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

namespace EcommerceAPI.Controllers
{
    [Route("[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly EcommerceDBContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoriesController> _logger;
        private readonly IHttpContextAccessor _contextAccessor;

        public CategoriesController(EcommerceDBContext context, IMapper mapper,
            ILogger<CategoriesController> logger, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _contextAccessor = contextAccessor;
        }

        // GET: Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var categories = await _context.Categories.ToListAsync();
            var categoriesResponse = _mapper.Map<IEnumerable<CategoryResponse>>(categories);

            return Ok(categoriesResponse);
        }

        // GET: Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryResponse>> GetCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var categoryResponse = _mapper.Map<CategoryResponse>(category);
            return Ok(categoryResponse);
        }

        // PUT: Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] CategoryRequestPUT categoryRequest)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            if (id != categoryRequest.Id)
            {
                return BadRequest("Id does not match.");
            }

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            if (categoryRequest.Name == category.Name)
            {
                return BadRequest("Category name must be different than the current one");
            }

            var newSlug = StringUtils.ToSlug(categoryRequest.Name);

            if (await _context.Categories.AnyAsync(c => c.Id != categoryRequest.Id && c.Slug == newSlug))
            {
                return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
            }

            _mapper.Map(categoryRequest, category);
            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return Ok(_mapper.Map<CategoryResponse>(category));
        }

        // POST: Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Category>> PostCategory(CategoryRequestPOST categoryRequest)
        {
            _logger.LogInformation("API request: {@Controller} - {@ActionMethod}", nameof(CategoriesController), nameof(PostCategory));
            _logger.LogInformation("Request info: {@Headers}", _contextAccessor.HttpContext?.Request.Headers);
            _logger.LogInformation("Request info: {@Body}", _contextAccessor.HttpContext?.Request.Body);
            _logger.LogInformation("Request body: {@RequestBody}", categoryRequest);


            if (_context.Categories == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("New category validation failed");
                return BadRequest(ModelState);
            }

            if (CategoryExists(StringUtils.ToSlug(categoryRequest.Name)))
            {
                return Conflict(new { statusCode = HttpStatusCode.Conflict, message = "Category name must be unique", categoryRequest });
            }

            var category = _mapper.Map<Category>(categoryRequest);

            _context.Categories.Add(category);

            try
            {
                await _context.SaveChangesAsync();
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

            var categoryResponse = _mapper.Map<CategoryResponse>(category);

            return CreatedAtAction(nameof(PostCategory), new { id = categoryResponse.Id }, categoryResponse);
        }

        // DELETE: Categories/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(object identifier)
        {
            return identifier is int id 
                   ? _context.Categories!.Any(category => category.Id == id)
                   : identifier is string slug
                   ? _context.Categories!.Any(category => category.Slug == slug)
                   : throw new ArgumentException("Input must be either an integer or a string");
        }
    }
}
