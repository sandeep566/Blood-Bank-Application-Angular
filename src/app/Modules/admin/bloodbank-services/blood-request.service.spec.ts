import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BloodRequestService } from './blood-request.service';

describe('BloodRequestService', () => {
  let service: BloodRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(BloodRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
