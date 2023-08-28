import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { BloodRequestService } from '../../bloodbank-services/blood-request.service';


@Component({
  selector: 'app-blood-requests',
  templateUrl: './blood-requests.component.html',
  styleUrls: ['./blood-requests.component.css']
})
export class BloodRequestsComponent {

  constructor(private bloodRequestService: BloodRequestService,private router:Router) {
    this.getPageRequests(this.requestedPage);
  }


  bloodRequestModel:BloodRequestModel;

  click = false;

  allBloodRequests:BloodRequestModel[];

  bloodRequests:BloodRequestModel[];

  errorMessage: string | null;

  // messageTimeOut:NodeJS.Timeout;

  searchTextControl = "";

  totalPages:number=0;

  requestedPage = 1;

  size:number = 5;

  sort:string = "";


  searchByName(){
    // this.bloodRequestService.getAllBloodRequests()
    // .subscribe(
    //   res => this.allBloodRequests = res
    // )
    return this.bloodRequests.filter(request => request.hospital.hospitalName.includes(this.searchTextControl));
  }


  getAllRequests(){
    this.bloodRequestService.getAllBloodRequests()
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
    this.bloodRequestService.getPageRequest(requestedPage,this.size,this.sort)
    .subscribe(
      res => {
        this.bloodRequests = res.content;
        this.totalPages = res.totalPages
      }
    )
  }




  // getFilteredSuppliedRequests(): Observable<BloodRequestModel[]> {
  //   return this.bloodRequestService.getAllBloodRequests()
  //     .pipe(
  //       map((suppliedRequests: BloodRequestModel[]) => {
  //         // Perform your filtering logic here
  //         // For example, filtering by blood group 'A+':
  //         return suppliedRequests.filter(request => request.supplied === false);
  //       })
  //     );
  // }


  onSupply(bloodRequest:BloodRequestModel){
    this.bloodRequestModel = bloodRequest;
    this.click = true;
    console.log(this.bloodRequestModel);
  }

  supply(requestId:number){
    this.bloodRequestService.supplyBlood(requestId)
    .subscribe(
      res => {
        console.log(res)
        this.errorMessage = null;
        this.router.navigate(['/blood-bank/suppliedRequests'])
        location.reload();
      },(error)=> {
        // clearTimeout(this.messageTimeOut)
        this.click = true;
        this.errorMessage = error.error.message;
        // this.messageTimeOut =
        setTimeout(() =>{
          this.errorMessage = null;
        },3000);
      }
    )
  }

}
