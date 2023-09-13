using Core.Promotions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Data.Promotions
{
    public class PromotionRepository : DbContext, IPromotionRepository
    {
        private readonly ILogger<PromotionRepository> logger;

        public PromotionRepository(DbContextOptions<PromotionRepository> options, ILogger<PromotionRepository> logger) : base(options)
        {
            this.logger = logger;
        }

        public DbSet<PromotionDbModel> Promotions { get; set; }

        public async Task<IReadOnlyCollection<Promotion>> GetAllAsync()
        {
            var promotions = await Promotions.ToListAsync();

            return promotions
                .Select(MapToDomainModel)
                .ToList();
        }

        private static Promotion MapToDomainModel(PromotionDbModel dbModel)
            => new Promotion(
                dbModel.Id,
                dbModel.Type,
                dbModel.Description,
                dbModel.AppliesToProductId,
                dbModel.DiscountValue,
                dbModel.DiscountQuantity,
                dbModel.TriggerPrice,
                dbModel.TriggerQuantity
            );
    }
}
