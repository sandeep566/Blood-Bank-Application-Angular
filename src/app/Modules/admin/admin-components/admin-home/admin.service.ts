import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { BloodBankProfile } from 'src/app/Model/BloodBankProfile';
import { BloodQuantityLevel } from "../../../../Model/BloodQuantityLevel";
import { JWTTokenService } from "../../../../services/Jwt-Service/jwttoken.service";


@Injectable({
  providedIn: 'root'
})
export class AdminService{

  bloodQuantity:BloodQuantityLevel;
  constructor(private http:HttpClient,
              private jwtService:JWTTokenService) {
  }




  getBloodQuantity(){

    return firstValueFrom(this.http.get<BloodQuantityLevel>("http://localhost:2323/bloodBank/viewBloodGroupQuantity/"+this.jwtService.getId()))
      .then(res=>{
        this.bloodQuantity=res;
      })
      .catch(error=>console.log(error));

  }

  getBloodLevel(){
    return this.bloodQuantity;
  }

  getAdminProfile(){
    return this.http.get<BloodBankProfile>("http://localhost:2323/bloodBank/view/"+this.jwtService.getId());
  }

  updateProfile(formValues:any){
    formValues.bloodBankId = this.jwtService.getId();
    formValues.phoneNo = Number(formValues.phoneNo)
    console.log(formValues)
    this.http.put("http://localhost:2323/bloodBank/update",formValues)
    .subscribe(
      res => {
        console.log(res)
        location.reload();
      }
    )
  }



}
