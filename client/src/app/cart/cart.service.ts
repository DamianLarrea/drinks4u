import { Injectable } from '@angular/core';
import { product } from '../products/Product';
import { Cart } from './cart';
import { cartProduct } from './cartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public readonly cart: Cart = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0
  };

  public addProduct(product: product): void {

    var cartProduct = this.cart.products.find(p => p.id == product.id);

    if (cartProduct == null) {
      cartProduct = { id: product.id, name: product.name, price: product.price, quantity: 1 };
      this.cart.products.push(cartProduct);
    } else {
      cartProduct.quantity++;
    }

    this.cart.totalQuantity += 1;
    this.cart.totalPrice += product.price;
    
    console.log(`${product.name} added to cart`);
  }

  public decrementProductQuantity(productId: string): void {
    var cartProduct = this.cart.products.find(p => p.id == productId);

    if (cartProduct && cartProduct.quantity > 1) {
      cartProduct.quantity--;
      this.cart.totalPrice -= cartProduct.price;
      this.cart.totalQuantity--;
    }
  }

  public incrementProductQuantity(productId: string): void {
    var cartProduct = this.cart.products.find(p => p.id == productId);

    if (cartProduct) {
      cartProduct.quantity++;
      this.cart.totalPrice += cartProduct.price;
      this.cart.totalQuantity++;
    }
  }

  public removeProduct(product: cartProduct): void {
    let productIndex = this.cart.products.indexOf(product);

    if (productIndex > -1) {
      let cartProduct = this.cart.products[productIndex];
      this.cart.products.splice(productIndex, 1);

      this.cart.totalQuantity -= cartProduct.quantity;
      this.cart.totalPrice -= cartProduct.price * cartProduct.quantity;
    }
  }

  public clearCart(): void {
    this.cart.products = [];
    this.cart.totalPrice = 0;
    this.cart.totalQuantity = 0;
  }
}
