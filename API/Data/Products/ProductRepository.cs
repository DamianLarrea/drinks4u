using Core;
using Core.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text;

namespace Data.Products
{
    public class ProductRepository : DbContext, IProductRepository
    {
        private readonly ILogger<ProductRepository> logger;

        public ProductRepository(DbContextOptions<ProductRepository> opts, ILogger<ProductRepository> logger) : base(opts)
        {
            this.logger = logger;
        }

        public DbSet<ProductDbModel> Products { get; init; }

        public async Task<IReadOnlyCollection<Product>> GetAllAsync()
        {
            try
            {
                var products = await Products.ToListAsync();

                return products
                    .Select(MapToDomainModel)
                    .ToList();
            }
            catch(Exception e)
            {
                var errorMessageBuilder = new StringBuilder(e.Message);

                if (e.InnerException is not null) errorMessageBuilder.AppendLine(e.InnerException.Message);

                logger.LogError(errorMessageBuilder.ToString());

                throw new DbException();
            }
        }

        private static Product MapToDomainModel(ProductDbModel dbModel) => new Product(dbModel.Id, dbModel.Name, dbModel.Price);
    }
}