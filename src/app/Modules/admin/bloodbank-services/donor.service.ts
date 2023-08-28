import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "../../../services/Jwt-Service/jwttoken.service";
import {Router} from "@angular/router";
import {Donor} from "../../../Model/DonorModel";
import {PageModel} from "../../../Model/DonorPageModel";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorService {


  constructor(private http:HttpClient,
              private jwtService:JWTTokenService,
              private router:Router) {
    this.getAllDonors();
  }

  userId = this.jwtService.getId();




  registerDonor(donorObj:any){
    const phoneNo = Number(donorObj.phoneNo);
    const group = donorObj.bloodGroup;
    const aadhaarNo = Number(donorObj.aadhaarNo);
    const {bloodGroup , ...newData} = donorObj;
    newData.phoneNo = phoneNo;
    newData.aadharNo = aadhaarNo;
    console.log(newData);
    this.http.post(environment.apiUrl+"/donor/add/"+this.userId+"?bloodGroup="+group,newData)
      .subscribe(
        () =>{
          alert("Donor Registered Successfully");
          location.reload();
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }

  getAllDonors(){
    return this.http.get<Donor[]>(environment.apiUrl+"/bloodBank/viewDonors/"+this.userId);
  }

  getDonorCount(){
    return this.http.get<number>(environment.apiUrl+"/bloodBank/donorCount/"+this.userId);
  }

  getBloodCount(){
    return this.http.get<number>(environment.apiUrl+"/bloodBank/bloodCollected/"+this.userId);
  }

  getPageDonors(){
    return this.http.get<PageModel>(environment.apiUrl+"/donor/paginationAndSortingDonors/"+this.userId);
  }

  getNextPage(currentPage:number,sort:string){
    return this.http.get<PageModel>(environment.apiUrl+"/donor/paginationAndSortingDonors/"+this.userId + "?pageNo="+currentPage+"&sortBy="+sort);
  }

  updateDonorById(updateDonorForm:any){
    const group = updateDonorForm.bloodGroup;
    const {bloodGroup , ...newData} = updateDonorForm;
    newData.phoneNo = Number(updateDonorForm.phoneNo)
    newData.aadharNo = Number(updateDonorForm.aadhaarNo);
    console.log(newData)
    this.http.put(environment.apiUrl+"/donor/update"+"?bloodGroup="+group,newData)
      .subscribe(
        (res) =>{
          console.log(res);
          // location.reload();
        },
        error => {
          console.log(error)
        }
      );
  }


  deleteDonorById(id:number){
    this.http.delete(environment.apiUrl+"/donor/delete/"+id).subscribe(
      () => {
        location.reload();
      },
      (err) => console.log(err)
    );
  }


  getSuitableBloodGroupDonors(bloodGroups:string[]){
    const bloodGroupString = bloodGroups.join(',');
    return this.http.get<Donor[]>(environment.apiUrl+"/donor/getDonorsForSuitableBloodGroups?bloodGroups="+bloodGroupString);
  }

}
