using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.DataAccess;
using EcommerceAPI.Models.DataModels;
using EcommerceAPI.Models.DTOs.ProductDTOs.Request;
using EcommerceAPI.Models.DTOs.ProductDTOs.Response;
using EcommerceAPI.Services.Interfaces;

namespace EcommerceAPI.Controllers
{
    [Route("[controller]")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly EcommerceDBContext _context;
        private readonly IMapper _mapper;
        private IProductsService _productsService;

        public ProductsController(
            EcommerceDBContext context, 
            IMapper mapper,
            IProductsService productsService)
        {
            _context = context;
            _mapper = mapper;
            _productsService = productsService;
        }

        // GET: Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProducts()
        { 
            if (_context.Products == null)
            {
                return NotFound();
            }

            var products = await _context.Products.ToListAsync();
            var productsResponse = _mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
        }

        // GET: Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productResponse = _mapper.Map<ProductResponse>(product);
            return Ok(product);
        }

        // GET: Products/category/electronics
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProductsByCategory(int categoryId)
        {
            if (_context.Products == null)
                return NotFound();

            if (!CategoryExists(categoryId))
                return NotFound($"Category {categoryId} not found");

            var products = await _productsService.GetProductsByCategoryAsync(categoryId);
            var productsResponse = _mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
                
        }

        // PUT: Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutProduct(int id, ProductPUT productDTO)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            if (id != productDTO.Id)
            {
                return BadRequest("Id does not match.");
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _mapper.Map(productDTO, product);

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Product>> PostProduct(ProductPOST productRequest)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var product = _mapper.Map<Product>(productRequest);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var productResponse = _mapper.Map<ProductResponse>(product);

            return CreatedAtAction(nameof(PostProduct), new { id = productResponse.Id }, productResponse);
        }

        // DELETE: Products/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products!.Any(product => product.Id == id);
        }

        private bool CategoryExists(int categoryId)
        {
            return _context.Categories!.Any(category => category.Id == categoryId);
        }
    }
}
