import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environment/environment';
import { LoginService } from '../auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseURL = `${environment.apiHost}/Categories`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCategories(): Observable<Category[]> {
    let getCategoriesURL = `${this.baseURL}`;
    return this.httpClient.get(getCategoriesURL) as Observable<Category[]>;
  }

  addCategory(body: CategoryPOST): Observable<any> {
    let addCategoryURL = `${this.baseURL}`;
    /* const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };
    return this.httpClient.post(addCategoryURL, body, httpOptions) as Observable<any>; */
    return this.httpClient.post(addCategoryURL, category) as Observable<any>;
  }

  editCategory(category: Category): Observable<any> {
    let editCategoryURL = `${this.baseURL}/${category.id}`;
    return this.httpClient.put(editCategoryURL, category) as Observable<any>
  }

  deleteCategory(id: string): Observable<any> {
    let deleteCategoryURL = `${this.baseURL}/${id}`
    return this.httpClient.delete(deleteCategoryURL) as Observable<any>;
  }
}
