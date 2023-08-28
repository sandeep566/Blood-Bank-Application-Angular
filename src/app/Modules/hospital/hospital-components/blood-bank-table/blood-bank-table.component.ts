import { Component } from '@angular/core';
import { HospitalService } from '../../hospital-services/hospital.service';
import { BloodBankModel } from 'src/app/Model/BloodBankModel';

@Component({
  selector: 'app-blood-bank-table',
  templateUrl: './blood-bank-table.component.html',
  styleUrls: ['./blood-bank-table.component.css']
})
export class BloodBankTableComponent {

  constructor(private hospitalService:HospitalService){
    this.getPageRequests(this.requestedPage);
  }

  bloodBanks: BloodBankModel[] = [];

  allBloodBanks: BloodBankModel[] = [];
  totalPages:number=0;

  requestedPage = 1;

  size:number = 5;


  search:string = "";

  recieved:string = "";


  searchByName(){
    this.hospitalService.getAllBloodBanks()
    .subscribe(
      res => this.allBloodBanks = res
    )
    return this.allBloodBanks.filter(request => request.bloodBankName.includes(this.search));
  }



  getAllBloodBanks(){
    this.hospitalService.getAllBloodBanks()
    .subscribe(
      (res) => this.bloodBanks = res
    )
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
    this.hospitalService.getPageRequestBloodBank(requestedPage,this.size)
    .subscribe(
      res => {
        this.bloodBanks = res.content
        this.totalPages = res.totalPages
      }
    )
  }
}
