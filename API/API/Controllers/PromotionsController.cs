using Core.Promotions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromotionsController : ControllerBase
    {
        private readonly IPromotionService promotionService;

        public PromotionsController(IPromotionService promotionService)
        {
            this.promotionService = promotionService;
        }

        [HttpGet]
        public Task<IReadOnlyCollection<Promotion>> GetAsync()
        {
            return promotionService.GetAllAsync();
        }
    }
}
