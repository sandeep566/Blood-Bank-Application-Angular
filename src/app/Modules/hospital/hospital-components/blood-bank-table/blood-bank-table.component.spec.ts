import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBankTableComponent } from './blood-bank-table.component';

describe('BloodBankTableComponent', () => {
  let component: BloodBankTableComponent;
  let fixture: ComponentFixture<BloodBankTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodBankTableComponent]
    });
    fixture = TestBed.createComponent(BloodBankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
