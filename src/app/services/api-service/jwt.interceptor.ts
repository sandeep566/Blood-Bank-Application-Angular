import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from the local storage or any other source
    const jwtToken = localStorage.getItem('jwt');

    // Add the JWT token to the request header
    if (jwtToken) {
      request = request.clone({
        url: request.url,
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }

    return next.handle(request);
  }
}
export const JwtInterceptorProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}
