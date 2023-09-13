using Core.Promotions;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Promotions
{
    public class PromotionDbModel
    {
        public Guid Id { get; init; }

        public Guid? AppliesToProductId { get; init; }

        [Column(TypeName= "nvarchar(32)")]
        public PromotionType Type { get; init; }

        public string Description { get; init; } = "";

        [Column(TypeName = "decimal(4,2)")]
        public decimal? DiscountValue { get; init; }

        public int? DiscountQuantity { get; init; }

        [Column(TypeName = "decimal(4,2)")]
        public decimal? TriggerPrice { get; init; }

        public int? TriggerQuantity { get; init; }
    }
}
