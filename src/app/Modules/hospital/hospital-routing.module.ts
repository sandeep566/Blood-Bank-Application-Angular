import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HospitalHomeComponent} from "./hospital-components/hospital-home/hospital-home.component";
import { BloodBankTableComponent } from './hospital-components/blood-bank-table/blood-bank-table.component';
import { HospitalProfileComponent } from './hospital-components/hospital-profile/hospital-profile.component';
import { HospitalRequestsComponent } from './hospital-components/hospital-requests/hospital-requests.component';
import { AcceptedRequestsComponent } from './hospital-components/accepted-requests/accepted-requests.component';


const routes: Routes = [
  {
    path: 'home',component:HospitalHomeComponent
  },
  {
    path:'bloodBanks', component:BloodBankTableComponent
  },
  {
    path:'profile', component:HospitalProfileComponent
  },
  {
    path:'requests', component:HospitalRequestsComponent
  },
  {
    path:'accepted', component:AcceptedRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule { }
