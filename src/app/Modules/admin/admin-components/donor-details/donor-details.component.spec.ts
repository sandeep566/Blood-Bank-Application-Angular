import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDetailsComponent } from './donor-details.component';
import { DonorService } from '../../bloodbank-services/donor.service';
import { Donor } from 'src/app/Model/DonorModel';
import { of } from 'rxjs';

describe('DonorDetailsComponent', () => {
  let component: DonorDetailsComponent;
  let fixture: ComponentFixture<DonorDetailsComponent>;
  let mockDonorService: jasmine.SpyObj<DonorService>;

  beforeEach(() => {
    mockDonorService = jasmine.createSpyObj('DonorService', ['getAllDonors', 'getDonorCount', 'getBloodCount']);
    TestBed.configureTestingModule({
      declarations: [DonorDetailsComponent],
      imports:[HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DonorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
