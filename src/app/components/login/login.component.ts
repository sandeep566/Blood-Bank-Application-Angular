import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login-service/login.service";
import { CustomValidators } from '../signup/CustomValidators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) {
  }


  otp:string = "";
  forgetPassword = false;

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email,Validators.pattern("[^@\\s]+@[^@\\s]+\\.[^@\\s]+")]),
    password: new FormControl('',[Validators.required])
  });


  passwordForm = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.email,Validators.pattern("[^@\\s]+@[^@\\s]+\\.[^@\\s]+")]),
    otp: new FormControl(this.otp,[]),
    userPassword: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#%_^&]).{8,}")]),
    confirmPassword: new FormControl('',[Validators.required])
  },
    [CustomValidators.MatchValidator('userPassword', 'confirmPassword')]
  );




  show_button: Boolean = false;

  get email(){
    return this.loginForm.get('username');
  }
  get _password(){
    return this.loginForm.get('password');
  }


  get userEmail(){
    return this.passwordForm.get('userName');
  }
  get userPassword(){
    return this.passwordForm.get('userPassword');
  }

  get passwordMatchError() {
    return (
      this.passwordForm.getError('mismatch') &&
      this.passwordForm.get('confirmPassword')?.touched
    );
  }


  getOtp(userName:string){
    this.loginService.getOtp(userName)
    .subscribe(
      res => {
        this.passwordForm.controls['otp'].setValue(res.otp)
        console.log(this.otp)
      }

    )
  }


  resetPassword(passwordForm:any){
    this.loginService.resetPassword(passwordForm)
    .subscribe(
      (res) => {
        console.log(res)
        alert("password changed successfully");
        location.reload();
      },(error) => {
        console.error('Error:', error);
      }
    )
  }

  userLogin(data:any){
    this.loginService.login(data);
  }






showPassword() {
    this.show_button = !this.show_button;
  }

openForgetPassword(){
  this.forgetPassword = true
}


}
