import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IAuthenticated } from '../models/authenticated.model';
import { ILogin } from '../models/login.model';
import { IToken } from '../models/token.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _isLoggedIn: boolean | undefined;
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn); 

  // URLs
  loginURL = `${environment.apiHost}/api/Account/Login`;
  setTokenURL = `${environment.apiHost}/api/Account/SetToken`;
  checkTokenCookieURL = `${environment.apiHost}/api/Account/CheckCookie`;
  logOutURL = `${environment.apiHost}/api/Account/Logout`;

  constructor(private httpClient: HttpClient) {  }

  get isLoggedIn(): boolean {
    console.log("isLoggedIn getter");
    if (this._isLoggedIn !== undefined) {
      return this._isLoggedIn as boolean;
    } else{
      if (localStorage.getItem("isLoggedIn")) {
        this._isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")!);
        return this._isLoggedIn as boolean;
      } else {
        return false;
      }
    }
  }

  set isLoggedIn(loginStatus: boolean | undefined) {
    console.log("isLoggedIn setter");
    this._isLoggedIn = loginStatus;
    this.isLoggedIn$.next(loginStatus ?? false);
    localStorage.setItem("isLoggedIn", JSON.stringify(loginStatus));
  }

  logIn(requestBody: ILogin): Observable<IToken> {
    return this.httpClient.post(this.loginURL, requestBody) as Observable<IToken>;
  }

  setToken(token: string): Observable<any> {
    console.log("setToken()");
    return this.httpClient.post(this.setTokenURL, {}, { headers: { 'Authorization': "Bearer " + token }}) as Observable<any>;
  }

  checkTokenCookie():  Observable<HttpResponse<IAuthenticated>>{
    console.log("checkTokenCookie()");
    const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };  
    return this.httpClient.get<IAuthenticated>(this.checkTokenCookieURL, httpOptions) as Observable<HttpResponse<IAuthenticated>>;
  }

  logOut(): Observable<any> {
    const httpOptions = {
      withCredentials: true, 
      secureCookie: false,
      observe: 'response' as 'response'
    };  
    return this.httpClient.post(this.logOutURL, httpOptions) as Observable<any>
  }
}
