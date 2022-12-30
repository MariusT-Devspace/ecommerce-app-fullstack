import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ILogin } from '../../../models/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({});
  loginValues: ILogin | undefined;

  hide = true;
  showProgressBar = false;

  @Output() onLogIn = new EventEmitter<ILogin>();

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      identifier: new FormControl(''),
      password: new FormControl('')
    });
  }
  
  submitForm(){
    this.loginValues = this.loginForm.value;
    console.log(`Form values: ${JSON.stringify(this.loginValues)}`);
    if (this.loginValues){
      console.log("Login values are valid")
      this.onLogIn.emit(this.loginValues);
    }else{
      console.error("Sign up form not submitted correctly");
    }
  }

  resetForm(){
    this.loginForm.reset();
  }
}
