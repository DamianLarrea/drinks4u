import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { cartProduct } from './cartProduct';
import { Cart } from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: Cart;

  constructor(private cartService: CartService) { this.cart = cartService.cart; }

  clearCart(): void {
    this.cartService.clearCart();
  }

  decrementProductQuantity(productId: string): void {
    this.cartService.decrementProductQuantity(productId);
  }

  incrementProductQuantity(productId: string): void {
    this.cartService.incrementProductQuantity(productId);
  }

  removeFromCart(cartProduct: cartProduct): void {
    this.cartService.removeProduct(cartProduct);
  }
}
