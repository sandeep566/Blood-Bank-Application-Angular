import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDetailsComponent } from './donor-details.component';

describe('DonorDetailsComponent', () => {
  let component: DonorDetailsComponent;
  let fixture: ComponentFixture<DonorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorDetailsComponent]
    });
    fixture = TestBed.createComponent(DonorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
