import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminSignUpFormComponent } from './admin-sign-up-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AlertComponent } from 'src/app/alert/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from '../../bloodbank-services/admin.service';

describe('AdminSignUpFormComponent', () => {
  let component: AdminSignUpFormComponent;
  let fixture: ComponentFixture<AdminSignUpFormComponent>;
  let mockAdminService: jasmine.SpyObj<AdminService>;

  beforeEach(() => {

    mockAdminService = jasmine.createSpyObj('AdminService', ['signUp']);
    TestBed.configureTestingModule({
      declarations: [AdminSignUpFormComponent,AdminNavbarComponent,AlertComponent],
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule],
      providers: [{ provide: AdminService, useValue: mockAdminService }]
    });
    fixture = TestBed.createComponent(AdminSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show password when showPassword is called', () => {
    component.showPassword();
    expect(component.show_button).toBe(true);
  });

  it('should call signUp method when form is submitted', fakeAsync(() => {
    const formData = {
      bloodBankName: 'Test Blood Bank',
      address: 'Test Address',
      phoneNo: '9876543210',
      mailAddress: 'test@example.com',
      password: 'Test@1234',
      confirmPassword: 'Test@1234',
    };
    component.signUpForm.setValue(formData);

    // Trigger form submission
    component.toSignUp(formData);

    expect(mockAdminService.signUp).toHaveBeenCalledWith(formData);
  }));

  it('should disable submit button when form is invalid', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    // Initially, the form is invalid, so the button should be disabled
    expect(submitButton.disabled).toBe(true);

    // Set invalid form values (missing confirmPassword)
    component.signUpForm.setValue({
      bloodBankName: 'Test Blood Bank',
      address: 'Test Address',
      phoneNo: '9876543210',
      mailAddress: 'invalid_email',
      password: 'Test@1234',
      confirmPassword: '',
    });

    // Manually trigger change detection to update the button's state
    fixture.detectChanges();

    // After updating the form values, the button should still be disabled
    expect(submitButton.disabled).toBe(true);
  });

});
