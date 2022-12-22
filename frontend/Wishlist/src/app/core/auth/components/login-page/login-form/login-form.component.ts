import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ISignUp } from '../../../models/sign-up.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({});
  loginValues: ISignUp | undefined;

  hide = true;
  showProgressBar = false;

  @Output() onLogin = new EventEmitter<ISignUp>

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  
  submitForm(){
    this.loginValues = this.loginForm.value;
    console.log(`Form values: ${JSON.stringify(this.loginValues)}`);
    if (this.loginValues)
      this.onLogin.emit(this.loginValues);
    else
      console.error("Sign up form not submitted correctly");
  }

  resetForm(){
    this.loginForm.reset();
  }
}
