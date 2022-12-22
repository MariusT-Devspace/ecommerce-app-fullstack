import { Component, OnInit } from '@angular/core';
import { ISignUp } from '../../models/sign-up.model';
import { IToken } from '../../models/token.model';
import { LoginService } from '../../services/login.service';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.sass']
})
export class SignUpPageComponent{
  

  constructor(private signUpService: SignUpService, private loginService: LoginService) {}

  signUp(requestBody: ISignUp){
    this.signUpService.signUp(requestBody).subscribe(
      {
        next: (response: IToken) => this.loginService.setToken(JSON.stringify(response.token)),
        error: (err: Error) => console.error(`Error signing up: ${err.message}`),
        complete: () => console.log("Signed up correctly.")
      }
      
    );
  }
}
