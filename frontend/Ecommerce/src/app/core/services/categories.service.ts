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
  private baseURL = `${environment.apiHost}/api/Categories`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getCategories(): Observable<ICategory[]> {
    let getCategoriesURL = `${this.baseURL}`;
    return this.httpClient.get(getCategoriesURL) as Observable<ICategory[]>;
  }

  addCategory(body: ICategoryPOST): Observable<any> {
    let addCategoryURL = `${this.baseURL}`;
    /* const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };
    return this.httpClient.post(addCategoryURL, body, httpOptions) as Observable<any>; */
    return this.httpClient.post(addCategoryURL, body) as Observable<any>;
  }

  editCategory(category: ICategory): Observable<any> {
    let editCategoryURL = `${this.baseURL}/${category.id}`;
    return this.httpClient.put(editCategoryURL, category) as Observable<any>
  }

  deleteCategory(id: number): Observable<any> {
    let deleteCategoryURL = `${this.baseURL}/${id}`
    return this.httpClient.delete(deleteCategoryURL) as Observable<any>;
  }
}
