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
        private readonly EcommerceDBContext _dbContext;
        private readonly IMapper _mapper;
        private IProductsService _productsService;

        public ProductsController(
            EcommerceDBContext dbContext, 
            IMapper mapper,
            IProductsService productsService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _productsService = productsService;
        }

        // GET: Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProducts()
        { 
            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            var products = await _dbContext.Products.ToListAsync();
            var productsResponse = _mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
        }

        // GET: Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> GetProduct(int id)
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            var product = await _dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productResponse = _mapper.Map<ProductResponse>(product);
            return Ok(product);
        }

        // GET: Products/category/electronics
        [HttpGet("category/{categorySlug}")]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProductsByCategory(string categorySlug)
        {
            if (_dbContext.Products == null)
                return NotFound();

            if (!CategoryExists(categorySlug))
                return NotFound($"Category {categorySlug} not found");

            var products = await _productsService.GetProductsByCategoryAsync(categorySlug);
            var productsResponse = _mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
                
        }

        // PUT: Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutProduct(int id, ProductPUT productDTO)
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            if (id != productDTO.Id)
            {
                return BadRequest("Id does not match.");
            }

            var product = await _dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _mapper.Map(productDTO, product);

            _dbContext.Entry(product).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
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
            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            var product = _mapper.Map<Product>(productRequest);

            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            var productResponse = _mapper.Map<ProductResponse>(product);

            return CreatedAtAction(nameof(PostProduct), new { id = productResponse.Id }, productResponse);
        }

        // DELETE: Products/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_dbContext.Products == null)
            {
                return NotFound();
            }

            var product = await _dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _dbContext.Products!.Any(product => product.Id == id);
        }

        private bool CategoryExists(string categorySlug)
        {
            return _dbContext.Categories!.Any(category => category.Slug == categorySlug);
        }
    }
}
