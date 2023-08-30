import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BloodBankProfile } from 'src/app/Model/BloodBankProfile';
import { BloodQuantityLevel } from 'src/app/Model/BloodQuantityLevel';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private router:Router,private jwtService:JWTTokenService,private alertService:AlertService) { }

  alert = false;
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
        this.alert = true;
        this.alertService.message = "Account created successfully";
        this.alertService.isError = false;
        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          this.router.navigate(['/blood-bank/home']);
        },2000);
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
        this.alert = true;
        this.alertService.message = "Profile Updated Successfully";
        this.alertService.isError = false;
        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload();
        },2000);
      }
    )
  }

  updateBloodLevels(formValues:any){
    const bloodBankId = this.jwtService.getId();
    this.http.put(environment.apiUrl + "/bloodBank/updateBloodQuantities/"+bloodBankId+"?bloodGroup="+formValues.bloodGroup+"&quantity="+formValues.quantity,"")
    .subscribe(
      res => {
        this.alert = true;
        this.alertService.message = "Blood levels updated successfully";
        this.alertService.isError = false;

        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload();
        },2000);
      }
    )
  }

}
