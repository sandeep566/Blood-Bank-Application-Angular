import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HospitalProfile } from 'src/app/Model/HospitalProfile';
import { HospitalService } from '../../hospital-services/hospital.service';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css']
})
export class HospitalProfileComponent {

  profileForm:FormGroup;

  hospitalProfile:HospitalProfile


  constructor(private hospitalService:HospitalService,private jwtService:JWTTokenService,private alertService:AlertService){
    this.profileForm = new FormGroup({
      hospitalName: new FormControl(),
      address: new FormControl(),
      phoneNo: new FormControl()
    });
  }

  alert = false

  userName = this.jwtService.getUser();

  getBloodBankProfile(){
    this.hospitalService.getHospitalById()
    .subscribe(
      res => {
        this.hospitalProfile = res
        this.hospitalProfile.phoneNo = res.phoneNo.toString();
        console.log(this.hospitalProfile);
        this.initializeForm();
      }
    )
  }

  ngOnInit(){
    this.getBloodBankProfile();
  }

  initializeForm() {

    this.profileForm = new FormGroup({
      hospitalName: new FormControl(this.hospitalProfile.hospitalName,[Validators.required]),
      address: new FormControl(this.hospitalProfile.address,[Validators.required]),
      phoneNo: new FormControl(this.hospitalProfile.phoneNo,[Validators.required,Validators.pattern("^(\\+91|\\+91\\-|0)?[789]\\d{9}$")]),
    });
  }

  updateHospitalProfile(formData:any){
    this.hospitalService.updateHospital(formData)
    .subscribe(
      res => {
        this.alert = true;
        this.alertService.message = "Profile Updated Successfully";
        this.alertService.isError = false;
        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload()
        }, 2000);

      }
    )
  }




}
