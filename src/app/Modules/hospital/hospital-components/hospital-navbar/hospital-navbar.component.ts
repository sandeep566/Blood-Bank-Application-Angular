import { Component } from '@angular/core';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Component({
  selector: 'app-hospital-navbar',
  templateUrl: './hospital-navbar.component.html',
  styleUrls: ['./hospital-navbar.component.css']
})
export class HospitalNavbarComponent {

  constructor(private jwtService:JWTTokenService){

  }

  userName = this.jwtService.getUser();

  logout(){
    localStorage.clear();
    location.reload();
  }

}
