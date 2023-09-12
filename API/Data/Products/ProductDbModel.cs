namespace Data.Products
{
    public class ProductDbModel
    {
        public Guid Id { get; init; }

        public string Name { get; init; } = "";

        public decimal Price { get; init; }
    }
}
