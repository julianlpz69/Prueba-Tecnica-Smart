using ProductsApp.Application.DTOs;
using ProductsApp.Domain.Entities;
using ProductsApp.Domain.Repositories;

namespace ProductsApp.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public Task<(IEnumerable<Product> Items, int TotalCount)> GetAllAsync(
            int page, int pageSize, string? orderBy, bool asc)
            => _repo.GetAllAsync(page, pageSize, orderBy, asc);

        public async Task<Product?> GetByIdAsync(int id)
            => await _repo.GetByIdAsync(id);

        public async Task<Product> CreateAsync(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price
            };
            await _repo.AddAsync(product);
            return product;
        }

        public async Task<Product> UpdateAsync(int id, ProductDto dto)
        {
            var product = await _repo.GetByIdAsync(id)
                ?? throw new KeyNotFoundException($"Product {id} not found");

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;

            await _repo.UpdateAsync(product);
            return product;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _repo.GetByIdAsync(id)
                ?? throw new KeyNotFoundException($"Product {id} not found");

            await _repo.DeleteAsync(product);
        }
    }
}
