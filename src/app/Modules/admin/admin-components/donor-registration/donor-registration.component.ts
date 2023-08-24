import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DonorService } from "./donor.service";

@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css']
})
export class DonorRegistrationComponent {


  constructor(private donorService:DonorService) {
  }


  donorRegistration = new FormGroup({
    donorName: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.min(18),Validators.max(65),Validators.required]),
    aadhaarNo: new FormControl('',[Validators.required,Validators.pattern("\\d{4}\\d{4}\\d{4}$")]),
    address: new FormControl('',[Validators.required]),
    phoneNo: new FormControl('',[Validators.required,Validators.pattern("^(\\+91|\\+91\\-|0)?[789]\\d{9}$")]),
    donationQuantity: new FormControl('',[Validators.required,Validators.max(450)]),
    bloodGroup: new FormControl('',[Validators.required])
  });

  options:any[] = [
    { label: 'A+', value: 'A_POSITIVE' },
    { label: 'AB+', value: 'AB_POSITIVE' },
    { label: 'B-', value: 'B_NEGATIVE' },
    { label: 'O-', value: 'O_NEGATIVE'},
    { label: 'AB-', value: 'AB_NEGATIVE'},
    { label: 'B+', value: 'B_POSITIVE'},
    { label: 'A-', value: 'A_NEGATIVE'},
    { label: 'O+', value: 'O_POSITIVE'}
  ]


  get donorName(){
    return this.donorRegistration.get('donorName');
  }
  get age(){
    return this.donorRegistration.get('age');
  }

  get aadhaarNo(){
    return this.donorRegistration.get('aadhaarNo');
  }

  get _address(){
    return this.donorRegistration.get('address');
  }

  get _phoneNo(){
    return this.donorRegistration.get('phoneNo');
  }

  get donationQuantity(){
    return this.donorRegistration.get('donationQuantity');
  }
  get bloodGroup(){
    return this.donorRegistration.get('bloodGroup');
  }


  donorData(formData:any){
    this.donorService.registerDonor(formData);
  }


}
