import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseURL = `${environment.apiHost}/api`;

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    let url = `${this.baseURL}/Categories`;
    return this.httpClient.get(url) as Observable<ICategory[]>;
  }
}
