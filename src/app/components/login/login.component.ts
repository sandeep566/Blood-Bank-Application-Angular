import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login-service/login.service";
import { CustomValidators } from '../signup/CustomValidators';
import { AlertService } from 'src/app/services/alert.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public loginService: LoginService,private alertService:AlertService) {
  }


  alert = false;

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
      },(error) => {
        this.alert = true;
        this.alertService.message = "UserName doesnot exists";
        this.alertService.isError = true;
        setTimeout(()=>{
          this.alert = false
          this.alertService.message = ""
          this.alertService.isError = false;
          location.reload();
        },2000)
      }
    );
  }



  resetPassword(passwordForm:any){
    this.loginService.resetPassword(passwordForm)
    .subscribe(
      (res) => {
        this.alert = true;
        this.alertService.message = "Password changed successfully"
        this.alertService.isError = false;
        setTimeout(()=>{
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload();
        },2000)
      },(err) => {
        this.alert = true;
        this.alertService.message = err.error.message;
        this.alertService.isError = false;
        setTimeout(()=>{
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
        },2000)
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
