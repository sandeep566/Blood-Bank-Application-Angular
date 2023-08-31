import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorUpdateComponent } from './donor-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DonorsTableComponent } from '../donors-table/donors-table.component';

describe('DonorUpdateComponent', () => {
  let component: DonorUpdateComponent;
  let fixture: ComponentFixture<DonorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorUpdateComponent],
      providers:[DonorsTableComponent],
      imports:[ReactiveFormsModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DonorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
