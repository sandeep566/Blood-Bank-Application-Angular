import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HospitalProfile } from 'src/app/Model/HospitalProfile';
import { HospitalService } from '../hospital.service';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Component({
  selector: 'app-hospital-profile',
  templateUrl: './hospital-profile.component.html',
  styleUrls: ['./hospital-profile.component.css']
})
export class HospitalProfileComponent {

  profileForm:FormGroup;

  hospitalProfile:HospitalProfile


  constructor(private hospitalService:HospitalService,private jwtService:JWTTokenService){
    this.profileForm = new FormGroup({
      hospitalName: new FormControl(),
      address: new FormControl(),
      phoneNo: new FormControl()
    });
  }


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
        console.log(res)
        location.reload()
      }
    )
  }




}
