import { Component } from '@angular/core';
import { JWTTokenService } from 'src/app/services/Jwt-Service/jwttoken.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private jwtService:JWTTokenService){
    this.userName = this.jwtService.getUser();
  }

  userName:string | null;

  logout(){
    localStorage.clear();
    location.reload();
  }

}
