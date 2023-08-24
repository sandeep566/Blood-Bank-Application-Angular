import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignupService } from "../../services/signup-service/signup.service";
import { CustomValidators } from "./CustomValidators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signUpService:SignupService) {
  }

  show_button: Boolean = false;

  signUpForm = new FormGroup({
    hospitalName:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    phoneNo:new FormControl('',[Validators.required,Validators.pattern("^(\\+91|\\+91\\-|0)?[789]\\d{9}$")]),
    email:new FormControl('',[Validators.required,Validators.pattern("[^@\\s]+@[^@\\s]+\\.[^@\\s]+"),Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#%_^&]).{8,}")]),
    confirmPassword:new FormControl('',[Validators.required])
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  get _hospitalName(){
    return this.signUpForm.get('hospitalName');
  }
  get _address(){
    return this.signUpForm.get('address');
  }
  get _phoneNo(){
    return this.signUpForm.get('phoneNo');
  }
  get _email(){
    return this.signUpForm.get('email');
  }
  get _password(){
    return this.signUpForm.get('password');
  }

  get passwordMatchError() {
    return (
      this.signUpForm.getError('mismatch') &&
      this.signUpForm.get('confirmPassword')?.touched
    );
  }


  toSignUp(data:any){
    this.signUpService.signUp(data);
  }


  showPassword() {
    this.show_button = !this.show_button;
  }

}


