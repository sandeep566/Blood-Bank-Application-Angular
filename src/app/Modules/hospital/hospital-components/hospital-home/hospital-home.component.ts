import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../hospital-services/hospital.service';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';

@Component({
  selector: 'app-hospital-home',
  templateUrl: './hospital-home.component.html',
  styleUrls: ['./hospital-home.component.css']
})
export class HospitalHomeComponent {

  constructor(private hospitalService:HospitalService){
    this.getBloodRequests();
  }

  bloodRequests:BloodRequestModel[] = [];

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

  priorities:any[] = [
    { label: 'HIGH', value: 'HIGH'},
    { label: 'MEDIUM', value: 'MEDIUM'},
    { label: 'LOW', value: 'LOW'}
  ]

  requestForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required,Validators.max(90),Validators.min(1)]),
    quantity: new FormControl('',[Validators.required]),
    bloodGroup: new FormControl('',[Validators.required]),
    priority: new FormControl('',[Validators.required])
  })


  get name(){
    return this.requestForm.get('name')
  }

  get age(){
    return this.requestForm.get('age')
  }

  get quantity(){
    return this.requestForm.get('quantity')
  }

  get bloodGroup(){
    return this.requestForm.get('bloodGroup')
  }
  get priority(){
    return this.requestForm.get('priority')
  }

  postRequest(data:any){
    this.hospitalService.addRequest(data)
    .subscribe(
      (res) => {
        console.log(res)
        location.reload();
      }
    );
  }


  getBloodRequests(){
    this.hospitalService.getAllRequestsByHospital()
    .subscribe(
      res => this.bloodRequests = res
    )
    return this.bloodRequests;
  }

}
