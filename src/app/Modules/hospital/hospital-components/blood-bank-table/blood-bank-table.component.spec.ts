import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankTableComponent } from './blood-bank-table.component';
import { HospitalNavbarComponent } from '../hospital-navbar/hospital-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('BloodBankTableComponent', () => {
  let component: BloodBankTableComponent;
  let fixture: ComponentFixture<BloodBankTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodBankTableComponent,HospitalNavbarComponent],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(BloodBankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
