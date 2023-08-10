import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JWTTokenService} from "../../../../services/Jwt-Service/jwttoken.service";
import {Router} from "@angular/router";
import {Donor} from "../../../../Model/DonorModel";
import {PageModel} from "../../../../Model/DonorPageModel";

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
    this.http.post("http://localhost:2323/donor/add/"+this.userId+"?bloodGroup="+group,newData)
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
    return this.http.get<Donor[]>("http://localhost:2323/bloodBank/viewDonors/"+this.userId);
  }

  getDonorCount(){
    return this.http.get<number>("http://localhost:2323/bloodBank/donorCount/"+this.userId);
  }

  getBloodCount(){
    return this.http.get<number>("http://localhost:2323/bloodBank/bloodCollected/"+this.userId);
  }

  getPageDonors(){
    return this.http.get<PageModel>("http://localhost:2323/donor/paginationAndSortingDonors/"+this.userId);
  }

  getNextPage(currentPage:number,size:number,sort:string){
    return this.http.get<PageModel>("http://localhost:2323/donor/paginationAndSortingDonors/"+this.userId + "?pageNo="+currentPage+"&pageSize="+size+"&sortBy="+sort);
  }

  updateDonorById(updateDonorForm:any){
    const group = updateDonorForm.bloodGroup;
    const {bloodGroup , ...newData} = updateDonorForm;
    newData.phoneNo = Number(updateDonorForm.phoneNo)
    newData.aadharNo = Number(updateDonorForm.aadhaarNo);
    console.log(newData)
    this.http.put("http://localhost:2323/donor/update"+"?bloodGroup="+group,newData)
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
    this.http.delete("http://localhost:2323/donor/delete/"+id).subscribe(
      () => {
        location.reload();
      },
      (err) => console.log(err)
    );
  }


  getSuitableBloodGroupDonors(bloodGroups:string[]){
    const bloodGroupString = bloodGroups.join(',');
    return this.http.get<Donor[]>("http://localhost:2323/donor/getDonorsForSuitableBloodGroups?bloodGroups="+bloodGroupString);
  }

}
