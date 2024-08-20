import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environment/environment';
import { LoginService } from '../auth/services/login.service';
import { CategoryPOST } from 'src/app/models/DTOs/category-post.model';
import { CategoryPUT } from 'src/app/models/DTOs/category-put.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseURL = `${environment.apiHost}/Categories`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get(this.baseURL) as Observable<Category[]>;
  }

  getCategory(slug: string): Observable<Category> {
    let getCategoryURL = `${this.baseURL}/${slug}`;
    return this.httpClient.get(getCategoryURL) as Observable<Category>
  }

  addCategory(category: CategoryPOST): Observable<any> {
    /* const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };
    return this.httpClient.post(addCategoryURL, body, httpOptions) as Observable<any>; */
    return this.httpClient.post(this.baseURL, category) as Observable<any>;
  }

  editCategory(category: CategoryPUT): Observable<any> {
    let editCategoryURL = `${this.baseURL}/${category.id}`;
    return this.httpClient.put(editCategoryURL, category) as Observable<any>
  }

  deleteCategory(id: number): Observable<any> {
    let deleteCategoryURL = `${this.baseURL}/${id}`
    return this.httpClient.delete(deleteCategoryURL) as Observable<any>;
  }
}
