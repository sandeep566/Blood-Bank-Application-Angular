import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalNavbarComponent } from './hospital-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HospitalNavbarComponent', () => {
  let component: HospitalNavbarComponent;
  let fixture: ComponentFixture<HospitalNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalNavbarComponent],
      imports:[RouterTestingModule]
    });
    fixture = TestBed.createComponent(HospitalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
