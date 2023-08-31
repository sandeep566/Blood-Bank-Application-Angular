import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliedRequestsComponent } from './supplied-requests.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SuppliedRequestsComponent', () => {
  let component: SuppliedRequestsComponent;
  let fixture: ComponentFixture<SuppliedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliedRequestsComponent,AdminNavbarComponent],
      imports:[HttpClientTestingModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(SuppliedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
