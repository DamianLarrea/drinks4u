import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  cart: Cart;

  constructor(private cartService: CartService) { this.cart = cartService.cart; }
}
