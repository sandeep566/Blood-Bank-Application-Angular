import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert.service';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient,
              private router:Router,private alertService:AlertService) { }


  alert = false


  signUp(data:any){
    const phoneNo = Number(data.phoneNo);
    const {confirmPassword , ...newData} = data;
    newData.phoneNo = phoneNo;
    // console.log(newData)
    this.httpClient.post(environment.apiUrl+"/hospital/add", newData)
      .subscribe(
        () => {
          // Handle successful response
          // alert("Account created successfully")
          this.alert = true
          this.alertService.message = "Account created successfully";
          this.alertService.isError = false;
          setTimeout(()=>{
            this.alert = false;
            this.router.navigate(['/login']);
            this.alertService.message = "";
          this.alertService.isError = false;
          },3000)

        },
        (error) => {
          if(error.status === 0){
            this.alert = true
            this.alertService.message = "server down";
            this.alertService.isError = true;
          }
          else{
            this.alert = true
            this.alertService.message = error.error.message;
            this.alertService.isError = true;
          }
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
        }
      );
  }
}
