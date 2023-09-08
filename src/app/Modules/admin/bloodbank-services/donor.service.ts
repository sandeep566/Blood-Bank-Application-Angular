import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "../../../services/Jwt-Service/jwttoken.service";
import {Donor} from "../../../Model/DonorModel";
import {PageModel} from "../../../Model/DonorPageModel";
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class DonorService {


  constructor(private http:HttpClient,
              private jwtService:JWTTokenService,
              private alertService:AlertService) {
    this.getAllDonors();
  }

  alert = false;

  userId = this.jwtService.getId();




  registerDonor(donorObj:any){
    const phoneNo = Number(donorObj.phoneNo);
    const group = donorObj.bloodGroup;
    const aadhaarNo = Number(donorObj.aadhaarNo);
    const {bloodGroup , ...newData} = donorObj;
    newData.phoneNo = phoneNo;
    newData.aadharNo = aadhaarNo;
    // console.log(newData);
    this.http.post(environment.apiUrl+"/donor/add/"+this.userId+"?bloodGroup="+group,newData)
      .subscribe(
        () =>{
          // alert("Donor Registered Successfully");
          this.alert = true
          this.alertService.message = "Donor Registered Successfully";
          this.alertService.isError = false;
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
          location.reload();
        },
        (error) => {
          this.alert = true
          this.alertService.message = error.error.message;
          this.alertService.isError = true;
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
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
    newData.aadhaarNo = Number(updateDonorForm.aadhaarNo);
    // console.log(newData)
    this.http.put(environment.apiUrl+"/donor/update"+"?bloodGroup="+group,newData,{
      responseType:'text'
    })
      .subscribe(
        (res) =>{
          this.alert = true
          this.alertService.message = "Donor Updated";
          this.alertService.isError = false;
          // console.log(res)
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
            location.reload();
          },3000)
          // location.reload();
        },
        (error) => {
          this.alert = true
          this.alertService.message = error.error.substr(12,25);
          this.alertService.isError = true;
          console.log(error)
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
        }
      );
  }


  deleteDonorById(id:number){
    this.http.delete(environment.apiUrl+"/donor/delete/"+id,{
      responseType:'text'
    }).subscribe(
      () => {
          this.alert = true
          this.alertService.message = "Donor Deleted";
          this.alertService.isError = false;
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
            location.reload();
          },2000)
      },
      (err) => {
          this.alert = true
          this.alertService.message = err.error.message;
          this.alertService.isError = true;
          setTimeout(()=>{
            this.alert = false;
            this.alertService.message = "";
            this.alertService.isError = false;
          },3000)
      }
    );
  }


  getSuitableBloodGroupDonors(bloodGroups:string[]){
    const bloodGroupString = bloodGroups.join(',');
    return this.http.get<Donor[]>(environment.apiUrl+"/donor/getDonorsForSuitableBloodGroups?bloodGroups="+bloodGroupString);
  }

}
