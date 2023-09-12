namespace Core.Products
{
    public class Product
    {
        public Product(Guid id, string name, decimal price)
        {
            Id = id;
            Name = name;
            Price = price;
        }

        public Guid Id { get; }

        public string Name { get; }

        public decimal Price { get; }
    }
}