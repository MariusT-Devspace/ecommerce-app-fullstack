import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from 'src/app/models/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = `${environment.apiHost}/Users`
  usersSubject$ = new BehaviorSubject<IUser[]>([]);

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    let url = `${this.baseURL}`;
    return this.httpClient.get(url);
  }

  deleteUser(id: string): Observable<any> {
    let url = `${this.baseURL}/${id}`;
    return this.httpClient.delete(url)
  }
}
