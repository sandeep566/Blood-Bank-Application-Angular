import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {JWTTokenService} from "../Jwt-Service/jwttoken.service";
import {LocalStorageService} from "../Jwt-Service/local-storage.service";

export const bloodBankAuthGuard: CanActivateFn = (route, state) => {
  if(inject(JWTTokenService).getUser()){
    if(inject(JWTTokenService).isTokenExpired()){
      inject(Router).createUrlTree(['/login']);
      inject(LocalStorageService).remove('jwt');
    }else{
      if(inject(JWTTokenService).isAdmin()){
        inject(Router).createUrlTree(['/blood-bank']);
        return true;
      }
    }
  }
  return inject(Router).createUrlTree(['/login']);

};
