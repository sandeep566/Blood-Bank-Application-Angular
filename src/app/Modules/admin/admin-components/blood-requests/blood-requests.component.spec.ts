import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodRequestsComponent } from './blood-requests.component';

describe('BloodRequestsComponent', () => {
  let component: BloodRequestsComponent;
  let fixture: ComponentFixture<BloodRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodRequestsComponent]
    });
    fixture = TestBed.createComponent(BloodRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
