import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { product } from '../Product';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private cartService: CartService) { }

  products: Observable<product[]> | null = null;

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addProductToCart(product: product) : void {
    this.cartService.addProduct(product);
  }

}
