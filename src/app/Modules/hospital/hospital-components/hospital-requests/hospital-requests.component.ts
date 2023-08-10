import { Component, OnInit } from '@angular/core';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { HospitalService } from '../hospital.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-requests',
  templateUrl: './hospital-requests.component.html',
  styleUrls: ['./hospital-requests.component.css']
})
export class HospitalRequestsComponent implements OnInit{

  constructor(private hospitalService:HospitalService,private fb: FormBuilder){
    // this.getAllRequests();
    this.getPageRequests(this.requestedPage);
  }




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


  updateRequestForm: FormGroup;



  ngOnInit() {
    this.updateRequestForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      priority: ['', Validators.required],
      quantity: ['', Validators.required],
      supplied: [false] // Initialize the supplied control with the default value
    });
  }



  updateRequest(bloodRequest:BloodRequestModel){
    this.updateRequestForm.patchValue({
      id:bloodRequest.bloodRequestId,
      name: bloodRequest.patientName,
      age: bloodRequest.age,
      bloodGroup: bloodRequest.bloodGroup,
      priority: bloodRequest.priority,
      quantity: bloodRequest.quantity,
      supplied: bloodRequest.supplied
    });
  }

  saveChanges(updateRequestForm:any){
    this.hospitalService.updateRequest(updateRequestForm)
    .subscribe(
      res => {
        console.log(res)
        location.reload();
      }
    )
  }

  donorId:number;

  setId(bloodRequestId:number){
    this.donorId = bloodRequestId;
    console.log(this.donorId)
  }

  deleteRequest(id:number){
    this.hospitalService.deleteRequest(id)
    .subscribe(
      res => console.log(res)
    )
  }


  allBloodRequests:BloodRequestModel[] = []
  bloodRequests:BloodRequestModel[] = [];

  totalPages:number=0;

  requestedPage = 1;

  size:number = 5;

  sort:string = "";

  search:string = "";

  recieved:string = "";



  searchByName(){
    this.hospitalService.getAllRequestsByHospital()
    .subscribe(
      res => this.allBloodRequests = res
    )
    return this.allBloodRequests.filter(request => request.patientName.includes(this.search));
  }


  getAllRequests(){
    this.hospitalService.getAllRequestsByHospital()
    .subscribe(
      res => this.allBloodRequests = res
    )
    return this.allBloodRequests;
  }

  getPageRequests(requestedPage:number){
    if(requestedPage == 1 || this.totalPages == 1){
      requestedPage = 0;
    }else if(requestedPage > 1 && requestedPage <= this.totalPages){
      requestedPage -= 1
    }else if(requestedPage > this.totalPages){
      requestedPage = this.totalPages-1;
      this.requestedPage = this.totalPages
    }
    this.hospitalService.getPageRequest(requestedPage,this.size,this.sort)
    .subscribe(
      res => {
        this.bloodRequests = res.content
        this.totalPages = res.totalPages
      }
    )
  }
}
