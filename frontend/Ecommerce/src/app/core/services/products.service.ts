import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductPOST } from 'src/app/models/productPOST.model';
import { environment } from '../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL = `${environment.apiHost}/api/Products`

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
    return this.httpClient.post(url, body, { withCredentials: true } );
  }
}