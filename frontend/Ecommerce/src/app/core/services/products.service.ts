import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPOST } from 'src/app/models/DTOs/product-post.model';
import { environment } from '../../../environment/environment'
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { ProductPUT } from 'src/app/models/DTOs/product-put.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL = `${environment.apiHost}/Products`
  productsSubject$ = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient: HttpClient ) { }

  getProducts(): any {
    let url = `${this.baseURL}`;
    return this.httpClient.get(url);
  }

  getProductById(id: number): any {
    let url = `${this.baseURL}/${id}`;
    return this.httpClient.get(url);
  }

  getProductsByCategory(categoryId: number): any {
    let url = `${this.baseURL}/category/${categoryId}`;
    return this.httpClient.get(url);    
  }

  addProduct(body: ProductPOST) {
    let url = `${this.baseURL}`;
    return this.httpClient.post(url, body);
  }

  updateProduct(productPUT: ProductPUT) {
    let url = `${this.baseURL}/${productPUT.id}`
    return this.httpClient.put(url, productPUT);
  }
}
