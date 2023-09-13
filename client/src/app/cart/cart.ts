import { Promotion } from "../promotions/promotion"
import { cartProduct } from "./cartProduct"

export type Cart = {
    products: cartProduct[]
    totalQuantity: number,
    grossPrice: number,
    netPrice: number,
    promotion: Promotion | null
}