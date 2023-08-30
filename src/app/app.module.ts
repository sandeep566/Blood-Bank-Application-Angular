import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomecarouselComponent } from './components/homecarousel/homecarousel.component';
import { JwtInterceptorProvider} from "./services/api-service/jwt.interceptor";
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PagenotfoundComponent,
    HomecarouselComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule
  ],
  providers: [LoginComponent, JwtInterceptorProvider],
  exports: [
    HomecarouselComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
