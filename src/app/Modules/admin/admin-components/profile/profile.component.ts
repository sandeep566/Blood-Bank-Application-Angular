import { BloodBankProfile } from './../../../../Model/BloodBankProfile';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../bloodbank-services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  profileForm:FormGroup;

  bloodBankProfile:BloodBankProfile;


  constructor(private adminService:AdminService){
    this.profileForm = new FormGroup({
      bloodBankName: new FormControl(),
      address: new FormControl(),
      phoneNo: new FormControl()
    });
  }

  getBloodBankProfile(){
    this.adminService.getAdminProfile()
    .subscribe(
      (res) => {
        this.bloodBankProfile = res
        this.bloodBankProfile.phoneNumber = res.phoneNumber.toString();
        console.log(this.bloodBankProfile);
        this.initializeForm();
      }
    )
  }

  ngOnInit(){
    this.getBloodBankProfile();
  }

  initializeForm() {

    this.profileForm = new FormGroup({
      bloodBankName: new FormControl(this.bloodBankProfile.bloodBankName,[Validators.required]),
      address: new FormControl(this.bloodBankProfile.address,[Validators.required]),
      phoneNo: new FormControl(this.bloodBankProfile.phoneNumber,[Validators.required,Validators.pattern("^(\\+91|\\+91\\-|0)?[789]\\d{9}$")]),
    });
  }

  updateBloodBank(formValues:any){
    this.adminService.updateProfile(formValues);
  }

}
