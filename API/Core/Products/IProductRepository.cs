namespace Core.Products
{
    public interface IProductRepository
    {
        public Task<IReadOnlyCollection<Product>> GetAllAsync();
    }
}
