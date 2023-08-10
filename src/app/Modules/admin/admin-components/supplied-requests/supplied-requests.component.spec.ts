import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliedRequestsComponent } from './supplied-requests.component';

describe('SuppliedRequestsComponent', () => {
  let component: SuppliedRequestsComponent;
  let fixture: ComponentFixture<SuppliedRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliedRequestsComponent]
    });
    fixture = TestBed.createComponent(SuppliedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
