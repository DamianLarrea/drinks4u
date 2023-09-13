namespace Core.Promotions
{
    public interface IPromotionRepository
    {
        public Task<IReadOnlyCollection<Promotion>> GetAllAsync();
    }
}
