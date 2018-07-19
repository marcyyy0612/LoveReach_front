import { TestBed, inject } from '@angular/core/testing';

import { RecsService } from './recs.service';

describe('RecsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecsService]
    });
  });

  it('should be created', inject([RecsService], (service: RecsService) => {
    expect(service).toBeTruthy();
  }));
});
