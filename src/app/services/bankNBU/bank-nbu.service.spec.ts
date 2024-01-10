import { TestBed } from '@angular/core/testing';

import { BankNBUService } from './bank-nbu.service';

describe('BankNBUService', () => {
  let service: BankNBUService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankNBUService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
