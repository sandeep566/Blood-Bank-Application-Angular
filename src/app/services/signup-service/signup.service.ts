import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient,
              private router:Router) { }

  message:string|null;

  signUp(data:any){
    const phoneNo = Number(data.phoneNo);
    const {confirmPassword , ...newData} = data;
    newData.phoneNo = phoneNo;
    console.log(newData)
    this.httpClient.post(environment.apiUrl+"/hospital/add", newData)
      .subscribe(
        () => {
          // Handle successful response
          alert("Account created successfully")
          this.router.navigate(['/login']);
        },
        (error) => {
          if(error.status == 0){
            alert("Server Down")
          }
          else{
            alert(error.error.message);
          }
          // console.error(error);
        }
      );
  }
}
