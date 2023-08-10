import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {JWTTokenService} from "../Jwt-Service/jwttoken.service";
import {LocalStorageService} from "../Jwt-Service/local-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient,
              private jwtService:JWTTokenService,
              private localStorageService:LocalStorageService,
              private router:Router) { }

  login(data: any) {
    this.httpClient.post<{ jwtToken:string }>("http://localhost:2323/user/authenticate",data)
      .pipe(
        catchError((error) => {
          // Handle error
          alert("Invalid Credentials");
          console.error(error);
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
    return this.httpClient.put("http://localhost:2323/user/reset",newObj,{responseType:'text'});
  }


  getOtp(userName:string){
    return this.httpClient.get<{username:string, otp:string}>("http://localhost:2323/user/checkUsername/"+userName);
  }
}
