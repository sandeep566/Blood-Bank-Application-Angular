import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/components/signup/CustomValidators';
import { AdminService } from '../../bloodbank-services/admin.service';

@Component({
  selector: 'app-admin-sign-up-form',
  templateUrl: './admin-sign-up-form.component.html',
  styleUrls: ['./admin-sign-up-form.component.css']
})
export class AdminSignUpFormComponent {

  constructor(public adminService:AdminService) {
  }

  show_button: Boolean = false;

  signUpForm = new FormGroup({
    bloodBankName:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    phoneNo:new FormControl('',[Validators.required,Validators.pattern("^(\\+91|\\+91\\-|0)?[789]\\d{9}$")]),
    mailAddress:new FormControl('',[Validators.required,Validators.pattern("[^@\\s]+@[^@\\s]+\\.[^@\\s]+"),Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#%_^&]).{8,}")]),
    confirmPassword:new FormControl('',[Validators.required])
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  get _bloodBankName(){
    return this.signUpForm.get('bloodBankName');
  }
  get _address(){
    return this.signUpForm.get('address');
  }
  get _phoneNo(){
    return this.signUpForm.get('phoneNo');
  }
  get _email(){
    return this.signUpForm.get('mailAddress');
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
    this.adminService.signUp(data);
  }


  showPassword() {
    this.show_button = !this.show_button;
  }


}
