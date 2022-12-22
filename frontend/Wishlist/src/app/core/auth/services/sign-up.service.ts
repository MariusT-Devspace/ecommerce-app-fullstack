import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ISignUp } from '../models/sign-up.model';
import { IToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})  
export class SignUpService {
  url: string = `${environment.apiHost}/api/Account/Register`;

  constructor(private httpClient: HttpClient) { }
  
  signUp(requestBody: ISignUp): Observable<IToken>{
    return this.httpClient.post(this.url, requestBody) as Observable<IToken>; 
  }

}