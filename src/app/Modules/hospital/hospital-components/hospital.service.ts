import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodBankModel } from 'src/app/Model/BloodBankModel';
import { BloodBankPage } from 'src/app/Model/BloodBankPage';
import { BloodRequestModel } from 'src/app/Model/BloodRequestModel';
import { HospitalProfile } from 'src/app/Model/HospitalProfile';
import { RequestsPage } from 'src/app/Model/RequestsPage';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient,private jwtService:JWTTokenService) { }

  addRequest(requestData:any){
    const{priority,bloodGroup, ...newObj} = requestData;
    return this.http.post("http://localhost:2323/bloodRequest/add/"+this.jwtService.getId()+"?bloodGroup="+requestData.bloodGroup+"&priority="+requestData.priority,newObj);
  }

  getAllBloodBanks(){
    return this.http.get<BloodBankModel[]>("http://localhost:2323/bloodBank/viewAll");
  }

  getHospitalById(){
    return this.http.get<HospitalProfile>("http://localhost:2323/hospital/view/"+this.jwtService.getId());
  }


  updateHospital(data:any){
    data.hospitalId = this.jwtService.getId();
    data.phoneNo = Number(data.phoneNo)
    return this.http.put("http://localhost:2323/hospital/update",data);
  }

  getAllRequestsByHospital(){
    return this.http.get<BloodRequestModel[]>("http://localhost:2323/bloodRequest/viewAllByHospital/"+this.jwtService.getId());
  }

  getPageRequest(requestedPage:number,size:number,sortBy:string){
    return this.http.get<RequestsPage>("http://localhost:2323/bloodRequest/paginationAndSortingBloodRequests?pageNo="+requestedPage+"&pageSize="+size+"&sortBy="+sortBy);
  }

  getAcceptedRequests(){
    return this.http.get<BloodRequestModel[]>("http://localhost:2323/bloodRequest/acceptedRequests/"+this.jwtService.getId());
  }


  getPageRequestBloodBank(requestedPage:number,size:number){
    return this.http.get<BloodBankPage>("http://localhost:2323/bloodBank/paginationAndSortingBloodBanks?pageNo="+requestedPage+"&pageSize="+size);
  }


  updateRequest(updateForm:any){
    const group = updateForm.bloodGroup
    const prior = updateForm.priority
    const {bloodGroup,priority,supplied,...newObj} = updateForm
    return this.http.put("http://localhost:2323/bloodRequest/update?bloodGroup="+group+"&priority="+prior+"&isSupplied="+supplied,newObj);
  }


  deleteRequest(id:number){
    return this.http.delete("http://localhost:2323/bloodRequest/delete/"+id, {
      responseType:'text'
    });
  }
}

