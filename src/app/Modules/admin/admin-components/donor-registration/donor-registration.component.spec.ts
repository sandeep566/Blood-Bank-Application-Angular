import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorRegistrationComponent } from './donor-registration.component';
import { DonorDetailsComponent } from '../donor-details/donor-details.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DonorRegistrationComponent', () => {
  let component: DonorRegistrationComponent;
  let fixture: ComponentFixture<DonorRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorRegistrationComponent,DonorDetailsComponent,AlertComponent],
      imports:[HttpClientTestingModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(DonorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
