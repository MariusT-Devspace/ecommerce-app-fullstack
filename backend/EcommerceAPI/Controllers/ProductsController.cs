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
    public class ProductsController(
            EcommerceDBContext dbContext, IMapper mapper,
            IProductsService productsService
        ) : ControllerBase
    {
        // GET: Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProducts()
        { 
            if (dbContext.Products == null)
            {
                return NotFound();
            }

            var products = await dbContext.Products.ToListAsync();
            var productsResponse = mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
        }

        // GET: Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> GetProduct(int id)
        {
            if (dbContext.Products == null)
            {
                return NotFound();
            }

            var product = await dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productResponse = mapper.Map<ProductResponse>(product);
            return Ok(product);
        }

        // GET: Products/category/electronics
        [HttpGet("category/{categorySlug}")]
        public async Task<ActionResult<IEnumerable<ProductResponse>>> GetProductsByCategory(string categorySlug)
        {
            if (dbContext.Products == null)
                return NotFound();

            if (!CategoryExists(categorySlug))
                return NotFound($"Category {categorySlug} not found");

            var products = await productsService.GetProductsByCategoryAsync(categorySlug);
            var productsResponse = mapper.Map<IEnumerable<ProductResponse>>(products);

            return Ok(productsResponse);
        }

        // PUT: Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutProduct(int id, ProductPUT productDTO)
        {
            if (dbContext.Products == null)
            {
                return NotFound();
            }

            if (id != productDTO.Id)
            {
                return BadRequest("Id does not match.");
            }

            var product = await dbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            mapper.Map(productDTO, product);

            dbContext.Entry(product).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
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
            if (dbContext.Products == null)
            {
                return NotFound();
            }

            var product = mapper.Map<Product>(productRequest);

            dbContext.Products.Add(product);
            await dbContext.SaveChangesAsync();

            var productResponse = mapper.Map<ProductResponse>(product);

            return CreatedAtAction(nameof(PostProduct), new { id = productResponse.Id }, productResponse);
        }

        // DELETE: Products/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (dbContext.Products == null)
            {
                return NotFound();
            }

            var product = await dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            dbContext.Products.Remove(product);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return dbContext.Products!.Any(product => product.Id == id);
        }

        private bool CategoryExists(string categorySlug)
        {
            return dbContext.Categories!.Any(category => category.Slug == categorySlug);
        }
    }
}
