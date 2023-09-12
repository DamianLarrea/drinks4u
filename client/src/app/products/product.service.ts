import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts() : Observable<product[]> {
    return this.httpClient.get<product[]>(`${environment.apiUrl}/products`);
  }
  
}
