import { TestBed, inject } from '@angular/core/testing';

import { ModifyProfService } from './modify-prof.service';

describe('ModifyProfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyProfService]
    });
  });

  it('should be created', inject([ModifyProfService], (service: ModifyProfService) => {
    expect(service).toBeTruthy();
  }));
});
