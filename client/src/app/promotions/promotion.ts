export type Promotion = {
    id: string,
    appliesToProductId: string,
    type: PromotionType,
    description: string,
    discountValue: number,
    discountQuantity: number,
    triggerPrice: number,
    triggerQuantity: number,
}

export enum PromotionType {
    Cart,
    MultiBuy,
    Product
}