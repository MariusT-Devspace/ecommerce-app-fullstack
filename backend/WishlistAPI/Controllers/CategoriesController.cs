using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishlistAPI.DataAccess;
using WishlistAPI.Models.DataModels;
using WishlistAPI.Models.DTOs.CategoryDTOs.Request;
using WishlistAPI.Models.DTOs.CategoryDTOs.Response;

namespace WishlistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly WishlistDBContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(WishlistDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Categories
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

        // GET: api/Categories/5
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

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutCategory(int id, CategoryRequestPUT categoryDTO)
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Category>> PostCategory(CategoryRequestPOST categoryRequest)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }

            var category = _mapper.Map<Category>(categoryRequest);

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var categoryResponse = _mapper.Map<CategoryResponse>(category);
            return CreatedAtAction("GetCategory", new { id = categoryResponse.Id }, categoryResponse);
        }

        // DELETE: api/Categories/5
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

        private bool CategoryExists(int id)
        {
            return _context.Categories!.Any(e => e.Id == id);
        }
    }
}
