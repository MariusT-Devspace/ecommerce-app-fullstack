import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { SignUp } from '../models/sign-up.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})  
export class SignUpService {
  url: string = `${environment.apiHost}/Account/Register`;
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }
  
  signUp(requestBody: SignUp): Observable<Token>{
    return this.httpClient.post(this.url, requestBody) as Observable<Token>; 
  }
}