using ProductsApp.Domain.Entities;
using ProductsApp.Domain.Repositories;
using ProductsApp.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace ProductsApp.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<Product> Items, int TotalCount)> GetAllAsync(
            int page, int pageSize, string? orderBy, bool asc)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(orderBy))
            {
                query = (orderBy.ToLower(), asc) switch
                {
                    ("name", true) => query.OrderBy(p => p.Name),
                    ("name", false) => query.OrderByDescending(p => p.Name),
                    ("price", true) => query.OrderBy(p => p.Price),
                    ("price", false) => query.OrderByDescending(p => p.Price),
                    ("createdat", true) => query.OrderBy(p => p.CreatedAt),
                    ("createdat", false) => query.OrderByDescending(p => p.CreatedAt),
                    _ => query.OrderBy(p => p.Id)
                };
            }
            else
            {
                query = query.OrderBy(p => p.Id);
            }

            var total = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return (items, total);
        }

        public Task<Product?> GetByIdAsync(int id)
            => _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        public async Task AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
