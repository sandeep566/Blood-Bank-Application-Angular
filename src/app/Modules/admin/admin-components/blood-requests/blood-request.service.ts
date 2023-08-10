import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';
import { SuppliedRequest } from 'src/app/Model/SuppliedRequest';
import { RequestsPage } from 'src/app/Model/RequestsPage';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {


  private baseUrl = 'http://localhost:2323/bloodRequest';

  constructor(private http:HttpClient,private jwtService:JWTTokenService) { }



  getAllBloodRequests(){
    return this.http.get<BloodRequestModel[]>("http://localhost:2323/bloodRequest/viewAll")
  }


  getSuppliedRequests(){
    return this.http.get<SuppliedRequest[]>("http://localhost:2323/supply/supplyReportById/"+this.jwtService.getId());
  }


  supplyBlood(bloodRequestId:number){
    return this.http.post("http://localhost:2323/supply/add/"+bloodRequestId+"/"+this.jwtService.getId(),null);
  }

  getPageRequest(requestedPage:number,size:number,sortBy:string){
    return this.http.get<RequestsPage>("http://localhost:2323/bloodRequest/paginationAndSortingBloodRequests?pageNo="+requestedPage+"&pageSize="+size+"&sortBy="+sortBy);
  }


}
