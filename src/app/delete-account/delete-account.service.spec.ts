import { TestBed, inject } from '@angular/core/testing';

import { DeleteAccountService } from './delete-account.service';

describe('DeleteAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteAccountService]
    });
  });

  it('should be created', inject([DeleteAccountService], (service: DeleteAccountService) => {
    expect(service).toBeTruthy();
  }));
});
