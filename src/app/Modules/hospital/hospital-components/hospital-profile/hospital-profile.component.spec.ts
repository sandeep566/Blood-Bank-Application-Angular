import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalProfileComponent } from './hospital-profile.component';
import { HospitalNavbarComponent } from '../hospital-navbar/hospital-navbar.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HospitalProfileComponent', () => {
  let component: HospitalProfileComponent;
  let fixture: ComponentFixture<HospitalProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalProfileComponent,HospitalNavbarComponent,AlertComponent],
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(HospitalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
