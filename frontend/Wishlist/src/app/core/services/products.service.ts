import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient ) { }

  getProducts(): any{
    let url: string = `${environment.apiHost}/api/Products`;
    return this.httpClient.get(url);
  }
}
