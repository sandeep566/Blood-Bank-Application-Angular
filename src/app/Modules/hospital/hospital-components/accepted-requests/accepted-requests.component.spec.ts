import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedRequestsComponent } from './accepted-requests.component';
import { HospitalNavbarComponent } from '../hospital-navbar/hospital-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AcceptedRequestsComponent', () => {
  let component: AcceptedRequestsComponent;
  let fixture: ComponentFixture<AcceptedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedRequestsComponent,HospitalNavbarComponent],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(AcceptedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
