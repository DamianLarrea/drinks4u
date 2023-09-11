import { cartProduct } from "./cartProduct"

export type Cart = {
    products: cartProduct[]
    totalQuantity: number,
    totalPrice: number
}