import { TestBed, inject } from '@angular/core/testing';

import { ModifyProfImgService } from './modify-prof-img.service';

describe('ModifyProfImgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyProfImgService]
    });
  });

  it('should be created', inject([ModifyProfImgService], (service: ModifyProfImgService) => {
    expect(service).toBeTruthy();
  }));
});
