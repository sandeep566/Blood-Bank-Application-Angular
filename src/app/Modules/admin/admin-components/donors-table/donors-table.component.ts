import {Component, Injectable, OnInit} from '@angular/core';
import {DonorService} from "../../bloodbank-services/donor.service";
import {Donor} from "../../../../Model/DonorModel";


interface CheckboxItem {
  value: string;
  checked: boolean;
  label: string;
}

@Component({
  selector: 'app-donors-table',
  templateUrl: './donors-table.component.html',
  styleUrls: ['./donors-table.component.css']
})
export class DonorsTableComponent implements OnInit{

  constructor(private donorService:DonorService) {

  }


  checkboxList: CheckboxItem[] = [
    { value: 'A_POSITIVE', checked: false , label:'A+'},
    { value: 'AB_POSITIVE', checked: false , label:'AB+'},
    { value: 'O_POSITIVE', checked: false , label:'O+'},
    { value: 'A_NEGATIVE', checked: false , label:'A-'},
    { value: 'AB_NEGATIVE', checked: false , label:'AB-'},
    { value: 'O_NEGATIVE', checked: false , label:'O-'},
    { value: 'B_NEGATIVE', checked: false , label:'B-'},
    { value: 'B_POSITIVE', checked: false , label:'B+'},
  ];

  updateCheckedValues() {
    const checkedValues = this.checkboxList
      .filter(item => item.checked)
      .map(item => item.value);
    console.log(checkedValues);
    this.donorService.getSuitableBloodGroupDonors(checkedValues)
    .subscribe(
      res => this.donorsPages = res
    )
  }

  // getSuitableDonor(bloodGroups:string[]){
  //   this.donorService.getSuitableBloodGroupDonors(bloodGroups)
  //   .subscribe(
  //     res => console.log(res)
  //   )
  // }

  ngOnInit() {
    this.getDonorList();

  }




  donorId:number;

  allDonors:Donor[] = [];
  search:string = "";

  donorsPages:Donor[] = [];
  currentPage:number = 0;
  totalPages:number
  isLast:boolean;
  pageNumbers:number[] = [];

  // size:number=5;

  sort:string = "";


  updatePopUp = false;

  donorToUpdate = {
    donorId: 0,
    donorName: "",
    age: 0,
    aadhaarNo:0,
    address: "",
    phoneNo: 0,
    donationQuantity: 0,
    bloodGroup:""
  }

  getDonor(donor:number){
    this.donorId = donor;
  }

  updateDonor(donor:any){
    this.showUpdatePopUp();
    this.donorToUpdate = donor;
    console.log(donor);
  }
  showUpdatePopUp(){
    this.updatePopUp = true;
  }


  searchByName(){
    this.donorService.getAllDonors()
    .subscribe(
      res => this.allDonors = res
    )
    return this.allDonors.filter(request => request.donorName.includes(this.search));
  }


  getDonorList(){
    this.donorService.getPageDonors()
      .subscribe(
        (res)=>{
          this.donorsPages = res.content;
          this.currentPage = res.number;
          this.totalPages = res.totalPages;
          for (let i=1; i<=this.totalPages; i++){
            this.pageNumbers.push(i);
            if(i==3){
              break;
            }
          }
        }
      )
  }

  sendCurrentPage(pageNo:number){
    this.donorService.getNextPage(pageNo,this.sort)
      .subscribe(
        res => {
          this.donorsPages = res.content;
          this.totalPages = res.totalPages;
          this.isLast = res.last;
        }
      )
  }

  changeValuesFront(){
    if((this.totalPages - this.pageNumbers[2]) >= 3){
      this.pageNumbers = this.pageNumbers.map(num => num+3);
    }
    else if((this.totalPages - this.pageNumbers[2]) == 2){
      this.pageNumbers = this.pageNumbers.slice(0,2).map(num => num+3);
    }
    else if((this.totalPages - this.pageNumbers[2]) == 1){
      this.pageNumbers = this.pageNumbers.slice(0,1).map(num => num+3);
    }
    this.sendCurrentPage(this.pageNumbers[0]-1);

  }

  changeValuesBack(){
    this.sendCurrentPage(this.pageNumbers[0] -4);
    if(this.pageNumbers.length == 2){
      this.pageNumbers = this.pageNumbers.map(num => num -2);
      this.pageNumbers.push(this.pageNumbers[0]-1);
      this.pageNumbers = this.pageNumbers.sort();
    }
    else if(this.pageNumbers.length == 1){
      this.pageNumbers = this.pageNumbers.map(num => num -1);
      this.pageNumbers.push(this.pageNumbers[0]-2);
      this.pageNumbers.push(this.pageNumbers[0]-1);
      this.pageNumbers = this.pageNumbers.sort();
    }
    else if((this.pageNumbers[2] - 3) > 0){
      this.pageNumbers = this.pageNumbers.map(num => num -3);
    }
  }



  deleteDonor(id:number){
    this.donorService.deleteDonorById(id);
    location.reload();
  }




}
