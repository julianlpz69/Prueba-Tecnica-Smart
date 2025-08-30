using ProductsApp.Application.DTOs;
using ProductsApp.Domain.Entities;

namespace ProductsApp.Application.Services
{
    public interface IProductService
    {
        Task<(IEnumerable<Product> Items, int TotalCount)> GetAllAsync(
            int page, int pageSize, string? orderBy, bool asc);

        Task<Product?> GetByIdAsync(int id);
        Task<Product> CreateAsync(ProductDto dto);
        Task<Product> UpdateAsync(int id, ProductDto dto);
        Task DeleteAsync(int id);
    }
}
