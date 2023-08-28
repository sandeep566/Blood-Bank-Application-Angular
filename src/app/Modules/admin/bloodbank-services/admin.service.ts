import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BloodBankProfile } from 'src/app/Model/BloodBankProfile';
import { BloodQuantityLevel } from 'src/app/Model/BloodQuantityLevel';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private router:Router,private jwtService:JWTTokenService) { }

  bloodQuantity:BloodQuantityLevel;

  signUp(data:any){
    const phoneNo = Number(data.phoneNo);
    const {confirmPassword , ...newData} = data;
    newData.phoneNo = phoneNo;
    console.log(newData)
    this.http.post(environment.apiUrl+"/bloodBank/add",newData)
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


  async getBloodQuantity(){

    try {
      const res = await firstValueFrom(this.http.get<BloodQuantityLevel>(environment.apiUrl + "/bloodBank/viewBloodGroupQuantity/" + this.jwtService.getId()));
      this.bloodQuantity = res;
    } catch (error) {
      return console.log(error);
    }

  }

  getBloodLevel(){
    return this.bloodQuantity;
  }

  getAdminProfile(){
    return this.http.get<BloodBankProfile>(environment.apiUrl+"/bloodBank/view/"+this.jwtService.getId());
  }

  updateProfile(formValues:any){
    formValues.bloodBankId = this.jwtService.getId();
    formValues.phoneNo = Number(formValues.phoneNo)
    console.log(formValues)
    this.http.put(environment.apiUrl+"/bloodBank/update",formValues)
    .subscribe(
      res => {
        console.log(res)
        location.reload();
      }
    )
  }

}
