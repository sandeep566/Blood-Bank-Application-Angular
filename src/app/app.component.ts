import {Component, OnInit} from '@angular/core';
import {JWTTokenService} from "./services/Jwt-Service/jwttoken.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Blood-Bank-Application';
  isInitialized = false

  constructor(private jwtService:JWTTokenService) {
  }
  
  role:string
  forAdmin(){
    if(this.jwtService.isAdmin()){
      this.role = this.jwtService.getRole();
      return this.role;
    }
    return null;
  }

  forUser(){
    if(this.jwtService.isUser()){
      this.role = this.jwtService.getRole();
      return this.role;
    }
    return null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isInitialized = true; // Update the property inside the setTimeout
    }, 0);
  }
}
