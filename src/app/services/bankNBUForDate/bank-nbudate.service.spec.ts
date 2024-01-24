import { TestBed } from '@angular/core/testing';

import { BankNBUDateService } from './bank-nbudate.service';

describe('BankNBUDateService', () => {
  let service: BankNBUDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankNBUDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
