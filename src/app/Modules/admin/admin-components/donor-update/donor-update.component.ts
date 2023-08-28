import {Component, OnInit} from '@angular/core';
import {DonorService} from "../../bloodbank-services/donor.service";
import {DonorsTableComponent} from "../donors-table/donors-table.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-donor-update',
  templateUrl: './donor-update.component.html',
  styleUrls: ['./donor-update.component.css']
})
export class DonorUpdateComponent implements OnInit{


  myForm: FormGroup;
  updateForm: any = {
    donorId:0,
    donorName: "",
    age: 0,
    aadhaarNo: '',
    address: "",
    phoneNo: '',
    donationQuantity: 0,
    bloodGroup: ""
  };
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
  ngOnInit() {

    const phoneNumber = String(this.donorTable.donorToUpdate.phoneNo);
    const aadhaarNumber = String(this.donorTable.donorToUpdate.aadhaarNo);
    const { phoneNo, aadhaarNo, ...updateForm } = this.donorTable.donorToUpdate;
    this.updateForm = {
      ...updateForm,
      aadhaarNo: aadhaarNumber,
      phoneNo: phoneNumber
    };

    this.myForm = new FormGroup({
      donorId: new FormControl(this.updateForm.donorId),
      donorName: new FormControl(this.updateForm.donorName,[Validators.required]),
      age: new FormControl(this.updateForm.age, [Validators.min(18), Validators.max(65), Validators.required]),
      aadhaarNo: new FormControl(aadhaarNo, [Validators.required, Validators.pattern('\\d{4}\\d{4}\\d{4}$')]),
      address: new FormControl(this.updateForm.address, [Validators.required]),
      phoneNo: new FormControl(phoneNo, [Validators.required, Validators.pattern('^(\\+91|\\+91\\-|0)?[789]\\d{9}$')]),
      donationQuantity: new FormControl(this.updateForm.donationQuantity, [Validators.required, Validators.max(450)]),
      bloodGroup: new FormControl(this.updateForm.bloodGroup, [Validators.required]),
    });
  }

  constructor(private donorTable:DonorsTableComponent,private donorService:DonorService) {
  }




  updateDonor(){
    this.donorService.updateDonorById(this.myForm.value);
    location.reload();
  }



  closeUpdate(){
    this.donorTable.updatePopUp = false;
  }

}
