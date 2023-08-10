import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "../../../../services/Jwt-Service/jwttoken.service";
import {BloodQuantityLevel} from "../../../../Model/BloodQuantityLevel";
import {first, firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import { BloodBankModel } from 'src/app/Model/BloodBankModel';
import { BloodBankProfile } from 'src/app/Model/BloodBankProfile';


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
