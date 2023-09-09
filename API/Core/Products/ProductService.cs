namespace Core.Products
{
    public interface IProductService
    {
        IReadOnlyCollection<Product> GetProducts();
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;

        public ProductService(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public IReadOnlyCollection<Product> GetProducts() => productRepository.GetAll();
    }
}
