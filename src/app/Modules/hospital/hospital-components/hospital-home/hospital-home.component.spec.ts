import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHomeComponent } from './hospital-home.component';
import { HospitalNavbarComponent } from '../hospital-navbar/hospital-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HospitalHomeComponent', () => {
  let component: HospitalHomeComponent;
  let fixture: ComponentFixture<HospitalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalHomeComponent,HospitalNavbarComponent,AlertComponent],
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(HospitalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
