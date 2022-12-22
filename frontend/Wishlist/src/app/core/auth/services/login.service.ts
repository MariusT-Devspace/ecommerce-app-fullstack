import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  setTokenURL = `${environment.apiHost}/api/Account/SetToken`;

  constructor(private httpClient: HttpClient) { }

  setToken(token: string){
    this.httpClient.post(this.setTokenURL, {}, { headers: {'Authorization': `Bearer ${token}`}}).subscribe();
  }
}
