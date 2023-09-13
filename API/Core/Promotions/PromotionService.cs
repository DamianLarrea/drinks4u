namespace Core.Promotions
{
    public interface IPromotionService
    {
        Task<IReadOnlyCollection<Promotion>> GetAllAsync();
    }

    public class PromotionService : IPromotionService
    {
        private readonly IPromotionRepository promotionRepository;

        public PromotionService(IPromotionRepository promotionRepository)
        {
            this.promotionRepository = promotionRepository;
        }

        public Task<IReadOnlyCollection<Promotion>> GetAllAsync() => promotionRepository.GetAllAsync();
    }
}
