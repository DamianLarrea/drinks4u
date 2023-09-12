using Core.Products;
using FluentAssertions;
using Moq;

namespace Core.UnitTests.Products
{
    public class ProductServiceTests
    {
        private Mock<IProductRepository> productRepositoryMock;
        private ProductService productService;

        [SetUp]
        public void Setup()
        {
            productRepositoryMock = new Mock<IProductRepository>();
            productService = new ProductService(productRepositoryMock.Object);
        }

        [Test]
        public async Task Should_ReturnRepositoryProducts()
        {
            var repoProducts = new[]
            {
                new Product(Guid.NewGuid(), "Product 1", 12.99m),
                new Product(Guid.NewGuid(), "Product 2", 13.99m),
                new Product(Guid.NewGuid(), "Product 3", 14.99m),
            };

            productRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(repoProducts);

            var result = await productService.GetProductsAsync();

            result.Should().BeEquivalentTo(repoProducts);
        }
    }
}