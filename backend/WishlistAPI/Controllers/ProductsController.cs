using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishlistAPI.DataAccess;
using WishlistAPI.Models.DataModels;
using WishlistAPI.Models.DTOs.ProductDTOs.Request;
using WishlistAPI.Models.DTOs.ProductDTOs.Response;

namespace WishlistAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly WishlistDBContext _context;
        private readonly IMapper _mapper;

        public ProductsController(WishlistDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
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

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> GetProduct(int id)
        {
            var product = await _context.Products!.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productResponse = _mapper.Map<ProductResponse>(product);
            return Ok(product);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> PutProduct(int id, ProductRequestPUT productDTO)
        {
            if (id != productDTO.Id)
            {
                return BadRequest($"Id does not match. Id = {id}, body Id = {productDTO.Id}");
            }

            if (_context.Products == null)
            {
                return NotFound();
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult<Product>> PostProduct(ProductRequestPOST product)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }

            var mappedRequestProduct = _mapper.Map<Product>(product);

            _context.Products.Add(mappedRequestProduct);
            await _context.SaveChangesAsync();

            var mappedResponseProduct = _mapper.Map<ProductResponse>(product);

            return CreatedAtAction("GetProduct", new { id = mappedResponseProduct.Id }, mappedResponseProduct);
        }

        // DELETE: api/Products/5
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
            return _context.Products!.Any(e => e.Id == id);
        }
    }
}
