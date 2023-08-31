import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { DonorRegistrationComponent } from '../donor-registration/donor-registration.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { DonorDetailsComponent } from '../donor-details/donor-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHomeComponent,AdminNavbarComponent,BarChartComponent,DonorRegistrationComponent,AlertComponent,DonorDetailsComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
