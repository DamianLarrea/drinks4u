import { Injectable } from '@angular/core';
import { product } from '../products/Product';
import { Cart } from './cart';
import { cartProduct } from './cartProduct';
import { PromotionType } from '../promotions/promotion';
import { PromotionsService } from '../promotions/promotions.service';

@Injectable()
export class CartService {

  public readonly cart: Cart = {
    products: [],
    totalQuantity: 0,
    grossPrice: 0,
    netPrice: 0,
    promotion: null,
  };

  constructor(private promotionService: PromotionsService) { }

  public addProduct(product: product): void {

    var cartProduct = this.cart.products.find(p => p.id == product.id);

    if (cartProduct == null) {
      this.cart.products.push({ 
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 0,
        grossPrice: 0,
        netPrice: 0,
        promotion: null
      });
    }

    this.incrementProductQuantity(product.id);
    
    console.log(`${product.name} added to cart`);
  }

  public decrementProductQuantity(productId: string): void {
    var cartProduct = this.cart.products.find(p => p.id == productId);

    if (cartProduct && cartProduct.quantity > 1) {
      cartProduct.quantity--;
      cartProduct.grossPrice = cartProduct.quantity * cartProduct.price;
      cartProduct.netPrice = cartProduct.grossPrice;

      this.applyProductPromotions(cartProduct);
      
      this.updateCartValues();

      this.applyCartPromotions();
    }
  }

  public incrementProductQuantity(productId: string): void {
    let cartProduct = this.cart.products.find(p => p.id == productId);

    if (cartProduct) {
      cartProduct.quantity++;
      cartProduct.grossPrice = cartProduct.quantity * cartProduct.price;
      cartProduct.netPrice = cartProduct.grossPrice;

      this.applyProductPromotions(cartProduct);
      
      this.updateCartValues();

      this.applyCartPromotions();
    }
  }

  public removeProduct(product: cartProduct): void {
    let productIndex = this.cart.products.indexOf(product);

    if (productIndex > -1) {
      this.cart.products.splice(productIndex, 1);

      this.updateCartValues();

      this.applyCartPromotions();
    }
  }

  public clearCart(): void {
    this.cart.products = [];
    this.cart.grossPrice = 0;
    this.cart.netPrice = 0;
    this.cart.totalQuantity = 0;
    this.cart.promotion = null;
  }

  private applyProductPromotions(cartProduct: cartProduct): void {
    let promotions = this.promotionService.promotions;

    let multibuyPromotion = promotions.find(p => p.type == PromotionType.MultiBuy && p.appliesToProductId == cartProduct.id);
    if (multibuyPromotion && cartProduct.quantity >= multibuyPromotion.triggerQuantity) {
      var freeQuantity = Math.trunc(cartProduct.quantity / multibuyPromotion.triggerQuantity) * multibuyPromotion.discountQuantity;
      cartProduct.netPrice = cartProduct.grossPrice - (cartProduct.price * freeQuantity);
      cartProduct.promotion = multibuyPromotion;
    }
    else if (multibuyPromotion) {
      // ensure promotions are removed if conditions are no longer met
      cartProduct.promotion = null;
    }

    let productPromotion = promotions.find(p => p.type == PromotionType.Product && p.appliesToProductId == cartProduct.id);
    if (productPromotion && cartProduct.quantity >= productPromotion.triggerQuantity) {
      cartProduct.netPrice = cartProduct.grossPrice - (cartProduct.quantity * productPromotion.discountValue);
      cartProduct.promotion = productPromotion;
    }
  }

  private applyCartPromotions(): void {
    var promotions = this.promotionService.promotions;

    // Assumption: one cart promotion active at any given time
    var promotion = promotions.find(p => p.type == PromotionType.Cart);

    var productDiscountedTotal = this.cart.products.reduce((value, product) => value += product.netPrice, 0);
    if (promotion && productDiscountedTotal >= promotion.triggerPrice) {
      this.cart.netPrice = productDiscountedTotal - promotion.discountValue;
      this.cart.promotion = promotion;
    }

    if (this.cart.promotion && this.cart.netPrice < this.cart.promotion.triggerPrice)
      this.cart.promotion = null;
  }

  private updateCartValues(): void {
    this.cart.totalQuantity = this.cart.products.reduce((total, p) => total += p.quantity, 0);
    this.cart.grossPrice = this.cart.products.reduce((total, p) => total += p.grossPrice, 0);
    this.cart.netPrice = this.cart.products.reduce((total, p) => total += p.netPrice, 0);
  }
}
