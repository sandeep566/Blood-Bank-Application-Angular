import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminHomeComponent} from "./admin-components/admin-home/admin-home.component";
import {DonorsTableComponent} from "./admin-components/donors-table/donors-table.component";
import {DonorUpdateComponent} from "./admin-components/donor-update/donor-update.component";
import { ProfileComponent } from './admin-components/profile/profile.component';
import { BloodRequestsComponent } from './admin-components/blood-requests/blood-requests.component';
import { SuppliedRequestsComponent } from './admin-components/supplied-requests/supplied-requests.component';


const routes: Routes = [
  {
    path:'home', component:AdminHomeComponent
  },
  {
    path:'donors', component:DonorsTableComponent
  },
  {
    path:'profile', component:ProfileComponent
  },
  {
    path:'bloodRequests',component:BloodRequestsComponent
  },
  {
    path:'suppliedRequests', component:SuppliedRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
