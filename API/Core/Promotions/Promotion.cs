namespace Core.Promotions
{
    public class Promotion
    {
        public Promotion(
            Guid id,
            PromotionType type,
            string description,
            Guid? appliesToProductId = null,
            decimal? discountValue = null,
            int? discountQuantity = null,
            decimal? triggerPrice = null,
            int? triggerQuantity = null
        ) {
            Id = id;
            Type = type;
            Description = description;
            AppliesToProductId = appliesToProductId;
            DiscountValue = discountValue;
            DiscountQuantity = discountQuantity;
            TriggerPrice = triggerPrice;
            TriggerQuantity = triggerQuantity;
        }

        public Guid Id { get; }

        /// <summary>
        /// Id of the product that this promotion applies to (if any).
        /// E.g. Save $2 on VB, buy one get one free on Coopers
        /// </summary>
        public Guid? AppliesToProductId { get; }

        public PromotionType Type { get; }

        public string Description { get; }

        /// <summary>
        /// Used for promotions that apply to either single products or the cart total
        /// E.g. Save $2 on VB, spend $50 save $5
        /// </summary>
        public decimal? DiscountValue { get; }

        /// <summary>
        /// Used for multi-buy promotions
        /// E.g. Buy one get one free, buy two get one free, etc.
        /// </summary>
        public int? DiscountQuantity { get; }

        /// <summary>
        /// Used for promotions that apply to a required spend
        /// E.g. Spend $50 save $5
        /// </summary>
        public decimal? TriggerPrice { get; }

        /// <summary>
        /// Used for promotions that apply to quantities of products
        /// E.g. Save $2 on VB, buy one get one free, etc.
        /// </summary>
        public int? TriggerQuantity { get; }
    }
}
