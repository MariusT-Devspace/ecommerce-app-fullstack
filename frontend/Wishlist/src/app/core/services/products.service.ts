import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductPOST } from 'src/app/models/productPOST.model';
import { environment } from '../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL = `${environment.apiHost}/api`

  constructor(private httpClient: HttpClient ) { }

  getProducts(): any{
    let url = `${this.baseURL}/Products`;
    return this.httpClient.get(url);
  }

  addProduct(body: IProductPOST) {
    let url = `${this.baseURL}/Products/`;
    return this.httpClient.post(url, body, { withCredentials: true } );
  }
}
