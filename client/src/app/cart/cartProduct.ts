import { Promotion } from "../promotions/promotion";

export type cartProduct = {
    id: string,
    name: string,
    price: number,
    quantity: number
    grossPrice: number;
    netPrice: number;
    promotion: Promotion | null;
}