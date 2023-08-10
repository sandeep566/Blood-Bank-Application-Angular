import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bloodBankAuthGuard } from './blood-bank-auth.guard';

describe('bloodBankAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bloodBankAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
