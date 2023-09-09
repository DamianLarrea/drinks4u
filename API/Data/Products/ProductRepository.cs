using Core.Products;
using Microsoft.EntityFrameworkCore;

namespace Data.Products
{
    public class ProductRepository : DbContext, IProductRepository
    {
        public ProductRepository(DbContextOptions<ProductRepository> opts) : base(opts) { }

        public DbSet<ProductDbModel> Products { get; init; }

        public async Task<IReadOnlyCollection<Product>> GetAllAsync()
        {
            var products = await Products.ToListAsync();

            return products
                .Select(product => new Product(product.Id, product.Name, product.Price))
                .ToList();
        }
    }
}