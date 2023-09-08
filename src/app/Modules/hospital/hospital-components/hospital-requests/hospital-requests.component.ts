import { Component, OnInit } from '@angular/core';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { HospitalService } from '../../hospital-services/hospital.service';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-hospital-requests',
  templateUrl: './hospital-requests.component.html',
  styleUrls: ['./hospital-requests.component.css']
})
export class HospitalRequestsComponent implements OnInit{

  constructor(private hospitalService:HospitalService,private fb: FormBuilder,private alertService:AlertService){
    // this.getAllRequests();
    this.getPageRequests(this.requestedPage);
  }


  alert = false;




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
        this.alert = true;
        this.alertService.message = "Request Updated Successfully";
        this.alertService.isError = false;

        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload();
        },2000)
      },(error) => {
        this.alert = true;
        this.alertService.message = error.error.message;
        this.alertService.isError = true;
        setTimeout(() => {
          this.alert = false;
          this.alertService.message = "";
          this.alertService.isError = false;
          location.reload();
        },2000)
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
      res => {
        this.alert = true;
        this.alertService.message = "Request Deleted Successfully";
        this.alertService.isError = false;
        this.bloodRequests.splice(this.bloodRequests.indexOf(this.bloodRequests.find((value)=>value.bloodRequestId===id) as BloodRequestModel),1);
        if( this.bloodRequests.length %  this.size == 0){
          this.getPageRequests(this.requestedPage - 1)
          this.requestedPage -= 1;
        }
        setTimeout(() =>{
          this.alert = false;
          this.alertService.message = "";
          this.alert = false
        },3000)
      }
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
    return this.allBloodRequests.filter(request => request.patientName.includes(this.search.toLowerCase()));
  }


  getAllRequests(){
    this.hospitalService.getAllRequestsByHospital()
    .subscribe(
      res => this.allBloodRequests = res
    )
    return this.allBloodRequests;
  }

  getPageRequests(requestedPage:number){
    if(requestedPage == 1 || this.totalPages == 1 || this.requestedPage <= 0){
      requestedPage = 0;
      this.requestedPage = 1;
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
