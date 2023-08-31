import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRequestsComponent } from './hospital-requests.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { HospitalNavbarComponent } from '../hospital-navbar/hospital-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HospitalRequestsComponent', () => {
  let component: HospitalRequestsComponent;
  let fixture: ComponentFixture<HospitalRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalRequestsComponent,AlertComponent,HospitalNavbarComponent],
      imports:[HttpClientModule,ReactiveFormsModule,FormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(HospitalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
