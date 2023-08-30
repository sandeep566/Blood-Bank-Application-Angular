import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminHomeComponent } from './admin-components/admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin-components/admin-navbar/admin-navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { BarChartComponent } from './admin-components/bar-chart/bar-chart.component';
import { DonorRegistrationComponent } from './admin-components/donor-registration/donor-registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DonorDetailsComponent } from './admin-components/donor-details/donor-details.component';
import { BloodRequestsComponent } from './admin-components/blood-requests/blood-requests.component';
import { DonorsTableComponent } from './admin-components/donors-table/donors-table.component';
import { DonorUpdateComponent } from './admin-components/donor-update/donor-update.component';
import { ProfileComponent } from './admin-components/profile/profile.component';
import { SuppliedRequestsComponent } from './admin-components/supplied-requests/supplied-requests.component';
import { RouterModule } from '@angular/router';
import { AdminSignUpFormComponent } from './admin-components/admin-sign-up-form/admin-sign-up-form.component';
import { AlertModule } from 'src/app/alert/alert.module';



@NgModule({
    declarations: [
        AdminHomeComponent,
        AdminNavbarComponent,
        BarChartComponent,
        DonorRegistrationComponent,
        DonorDetailsComponent,
        BloodRequestsComponent,
        DonorsTableComponent,
        DonorUpdateComponent,
        ProfileComponent,
        SuppliedRequestsComponent,
        AdminSignUpFormComponent,

    ],
    exports: [
        AdminNavbarComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlertModule
    ]
})
export class AdminModule { }
