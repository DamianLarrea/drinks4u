namespace Core.Products
{
    public interface IProductRepository
    {
        public IReadOnlyCollection<Product> GetAll();
    }
}
