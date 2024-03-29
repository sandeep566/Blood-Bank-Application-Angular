import {Component, OnInit} from '@angular/core';
import {DonorService} from "../../bloodbank-services/donor.service";
import {Donor} from "../../../../Model/DonorModel";

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent implements OnInit{

  constructor(private donorService:DonorService) {
  }

  donors:Donor[] = [];
  donorCount:number
  bloodCount:number

  donorList(){
    this.donorService.getAllDonors()
      .subscribe(
        (res) =>{
          this.donors = res;
          this.donors.sort((a, b) => a.donorId - b.donorId);
          this.donors = this.donors.slice(-10);
        }
      )
  }

  countDonor(){
    this.donorService.getDonorCount()
      .subscribe(
        res =>{
          this.donorCount = res;
        }
      )
  }

  countOfBlood(){
    this.donorService.getBloodCount()
      .subscribe(
        res =>{
          this.bloodCount = res;
        }
      )
  }

  ngOnInit(): void {
    this.donorList();
    this.countDonor();
    this.countOfBlood();
  }

}
