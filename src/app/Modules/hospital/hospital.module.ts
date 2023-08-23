import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HospitalRoutingModule} from "./hospital-routing.module";
import { HospitalHomeComponent } from './hospital-components/hospital-home/hospital-home.component';
import { HospitalNavbarComponent } from './hospital-components/hospital-navbar/hospital-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BloodBankTableComponent } from './hospital-components/blood-bank-table/blood-bank-table.component';
import { HospitalProfileComponent } from './hospital-components/hospital-profile/hospital-profile.component';
import { HospitalRequestsComponent } from './hospital-components/hospital-requests/hospital-requests.component';
import { AcceptedRequestsComponent } from './hospital-components/accepted-requests/accepted-requests.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HospitalHomeComponent,
    HospitalNavbarComponent,
    BloodBankTableComponent,
    HospitalProfileComponent,
    HospitalRequestsComponent,
    AcceptedRequestsComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HospitalModule { }
