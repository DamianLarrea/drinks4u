using Core.Products;

namespace Data
{
    public class ProductRepository: IProductRepository
    {
        public IReadOnlyCollection<Product> GetAll() => new []
        {
            new Product(Guid.NewGuid(), "Victoria Bitter", 21.49m),
            new Product(Guid.NewGuid(), "Crown Lager", 22.99m),
            new Product(Guid.NewGuid(), "Coopers", 20.49m),
            new Product(Guid.NewGuid(), "Tooheys Extra Dry", 19.99m)
        };
    }
}