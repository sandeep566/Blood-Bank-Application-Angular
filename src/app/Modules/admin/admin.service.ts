import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BloodBankModel } from 'src/app/Model/BloodBankModel';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private jwtService:JWTTokenService) { }

 

}
