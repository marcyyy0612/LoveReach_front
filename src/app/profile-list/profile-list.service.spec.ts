import { TestBed, inject } from '@angular/core/testing';

import { ProfileListService } from './profile-list.service';

describe('ProfileListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileListService]
    });
  });

  it('should be created', inject([ProfileListService], (service: ProfileListService) => {
    expect(service).toBeTruthy();
  }));
});
