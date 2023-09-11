import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { product } from '../Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Observable<product[]> | null = null;

  ngOnInit(): void {
    this.products = this.productService.getProducts().pipe(
      tap(products => console.log(products))
    );
  }

  addProductToCart(product: product) : void {
  }

}
