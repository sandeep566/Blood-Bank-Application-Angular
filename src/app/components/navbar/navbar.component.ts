import {Component} from '@angular/core';
import {JWTTokenService} from "../../services/Jwt-Service/jwttoken.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private jwtService:JWTTokenService) {
  }

}
