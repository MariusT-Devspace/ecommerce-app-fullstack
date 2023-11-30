import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductPOST } from 'src/app/models/productPOST.model';
import { environment } from '../../../environment/environment'
import { IProduct } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';
import { IProductPUT } from 'src/app/models/productPUT.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseURL = `${environment.apiHost}/api/Products`
  productsSubject$ = new BehaviorSubject<IProduct[]>([]);

  constructor(private httpClient: HttpClient ) { }

  getProducts(): any {
    let url = `${this.baseURL}`;
    return this.httpClient.get(url);
  }

  getProductById(id: number): any {
    let url = `${this.baseURL}/${id}`;
    return this.httpClient.get(url);
  }

  addProduct(body: IProductPOST) {
    let url = `${this.baseURL}`;
    return this.httpClient.post(url, body);
  }

  updateProduct(productPUT: IProductPUT) {
    let url = `${this.baseURL}/${productPUT.id}`
    return this.httpClient.put(url, productPUT);
  }
}
