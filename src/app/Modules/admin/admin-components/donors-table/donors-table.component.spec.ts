import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsTableComponent } from './donors-table.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DonorsTableComponent', () => {
  let component: DonorsTableComponent;
  let fixture: ComponentFixture<DonorsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorsTableComponent,AlertComponent,AdminNavbarComponent],
      imports:[HttpClientModule,RouterTestingModule,FormsModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(DonorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
