using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Models.DTOs.CategoryDTOs;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<CategoryREST>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var categories = await _context.Categories.ToListAsync();
            var categoriesResponse = _mapper.Map<IEnumerable<CategoryREST>>(categories);

            return Ok(categoriesResponse);
        }

        // GET: Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryREST>> GetCategory(string id)
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

            var CategoryREST = _mapper.Map<CategoryREST>(category);
            return Ok(CategoryREST);
        }

        // PUT: Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutCategory(string id, [FromBody] CategoryREST categoryDTO)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            if (id != categoryDTO.Id)
            {
                return BadRequest("Id does not match.");
            }

            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            if (CategoryExists(id))
            {
                return BadRequest("Category name must be unique");
            }

            _mapper.Map(categoryDTO, category);

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

            return NoContent();
        }

        // POST: Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Category>> PostCategory(CategoryREST categoryRequest)
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

            if (CategoryExists(categoryRequest.Id))
            {
                return BadRequest("Category name must be unique");
            }

            var category = _mapper.Map<Category>(categoryRequest);
                _logger.LogInformation("Mapped category: {@Category}", category);

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                var CategoryREST = _mapper.Map<CategoryREST>(category);

                return CreatedAtAction("GetCategory", new { id = CategoryREST.Id }, CategoryREST);
            

            
            
        }

        // DELETE: Categories/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteCategory(string id)
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

        private bool CategoryExists(string id)
        {
            return _context.Categories!.Any(category => category.CategoryId == id);
        }
    }
}
