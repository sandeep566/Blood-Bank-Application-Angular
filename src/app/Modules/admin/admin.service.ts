import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private jwtService:JWTTokenService,private router:Router) { }


  signUp(data:any){
    const phoneNo = Number(data.phoneNo);
    const {confirmPassword , ...newData} = data;
    newData.phoneNo = phoneNo;
    console.log(newData)
    this.http.post("http://localhost:2323/bloodBank/add",newData)
    .subscribe(
      () => {
        // Handle successful response
        alert("Account created successfully")
        this.router.navigate(['/blood-bank/home']);
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
