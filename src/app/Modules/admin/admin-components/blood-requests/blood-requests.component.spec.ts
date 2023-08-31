import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodRequestsComponent } from './blood-requests.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('BloodRequestsComponent', () => {
  let component: BloodRequestsComponent;
  let fixture: ComponentFixture<BloodRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodRequestsComponent,AdminNavbarComponent],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(BloodRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
