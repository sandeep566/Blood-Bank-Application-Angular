import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {hospitalAuthGuard} from "./services/Auth-Service/hospital-auth.guard";
import {bloodBankAuthGuard} from "./services/Auth-Service/blood-bank-auth.guard";
import {PagenotfoundComponent} from "./components/pagenotfound/pagenotfound.component";

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path: "login",component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'blood-bank',
    canMatch:[bloodBankAuthGuard],
    loadChildren:() => import('./Modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path:'hospital',
    canMatch:[hospitalAuthGuard],
    loadChildren: () => import('./Modules/hospital/hospital.module').then((m) => m.HospitalModule),
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
