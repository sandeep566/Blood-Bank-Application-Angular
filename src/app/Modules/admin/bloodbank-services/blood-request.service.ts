import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';
import { SuppliedRequest } from 'src/app/Model/SuppliedRequest';
import { RequestsPage } from 'src/app/Model/RequestsPage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {


  constructor(private http:HttpClient,private jwtService:JWTTokenService) { }



  getAllBloodRequests(){
    return this.http.get<BloodRequestModel[]>(environment.apiUrl+"/bloodRequest/viewAll")
  }


  getSuppliedRequests(){
    return this.http.get<SuppliedRequest[]>(environment.apiUrl+"/supply/supplyReportById/"+this.jwtService.getId());
  }


  supplyBlood(bloodRequestId:number){
    return this.http.post(environment.apiUrl+"/supply/add/"+bloodRequestId+"/"+this.jwtService.getId(),null);
  }

  getPageRequest(requestedPage:number,size:number,sortBy:string){
    return this.http.get<RequestsPage>(environment.apiUrl+"/bloodRequest/paginationAndSortingBloodRequests?pageNo="+requestedPage+"&pageSize="+size+"&sortBy="+sortBy);
  }


}
