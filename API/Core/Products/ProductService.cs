namespace Core.Products
{
    public interface IProductService
    {
        Task<IReadOnlyCollection<Product>> GetProductsAsync();
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;

        public ProductService(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public async Task<IReadOnlyCollection<Product>> GetProductsAsync() => await productRepository.GetAllAsync();
    }
}
