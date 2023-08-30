import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {JWTTokenService} from "../Jwt-Service/jwttoken.service";
import {LocalStorageService} from "../Jwt-Service/local-storage.service";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient,
              private jwtService:JWTTokenService,
              private localStorageService:LocalStorageService,
              private router:Router,
              private alertService:AlertService) { }

  alert = false;

  login(data: any) {
    this.httpClient.post<{ jwtToken:string }>(environment.apiUrl+"/user/authenticate",data)
      .pipe(
        catchError((error) => {
          // Handle error
          this.alert = true
          this.alertService.message = "Invalid credentials";
          this.alertService.isError = true;
          // console.error(error);
          setTimeout(() => {
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
          return throwError(error); // Rethrow the error to propagate it to the subscriber
        })
      )
      .subscribe(
        jwtToken =>{
          this.jwtService.setToken(jwtToken.jwtToken);
          this.localStorageService.set('jwt',jwtToken.jwtToken);
          if (this.jwtService.isAdmin()) {
            this.router.navigate(['blood-bank/home']);
          } else{
            this.router.navigate(['hospital/home']);
          }
        }
      )
  }



  resetPassword(passwordForm:any){
    const{confirmPassword,...newObj} = passwordForm;
    console.log(newObj)
    return this.httpClient.put(environment.apiUrl+"/user/reset",newObj,{responseType:'text'});
  }


  getOtp(userName:string){
    return this.httpClient.get<{username:string, otp:string}>(environment.apiUrl+"/user/checkUsername/"+userName);
  }
}
