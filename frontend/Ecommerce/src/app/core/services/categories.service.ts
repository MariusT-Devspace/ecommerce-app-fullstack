import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { ICategoryPOST } from 'src/app/models/categoryPOST.model';
import { environment } from 'src/environment/environment';
import { LoginService } from '../auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseURL = `${environment.apiHost}/api`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCategories(): Observable<ICategory[]> {
    let getCategoriesURL = `${this.baseURL}/Categories`;
    return this.httpClient.get(getCategoriesURL) as Observable<ICategory[]>;
  }

  addCategory(body: ICategoryPOST): Observable<any> {
    let addCategoryURL = `${this.baseURL}/Categories`;
    const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };
    console.log("New category: ", body)
    return this.httpClient.post(addCategoryURL, body, httpOptions) as Observable<any>;
  }
}
