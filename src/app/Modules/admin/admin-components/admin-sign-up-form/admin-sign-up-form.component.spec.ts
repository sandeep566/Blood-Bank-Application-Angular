import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignUpFormComponent } from './admin-sign-up-form.component';

describe('AdminSignUpFormComponent', () => {
  let component: AdminSignUpFormComponent;
  let fixture: ComponentFixture<AdminSignUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSignUpFormComponent]
    });
    fixture = TestBed.createComponent(AdminSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
