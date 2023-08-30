import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set a value in local storage', () => {
    const key = 'testKey';
    const value = 'testValue';
    service.set(key, value);
    const retrievedValue = localStorage.getItem(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should get a value from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';
    localStorage.setItem(key, value);
    const retrievedValue = service.get(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should remove a value from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';
    localStorage.setItem(key, value);
    service.remove(key);
    const retrievedValue = localStorage.getItem(key);
    expect(retrievedValue).toBeNull();
  });

});

