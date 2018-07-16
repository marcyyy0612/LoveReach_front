import { TestBed, inject } from '@angular/core/testing';

import { MessagesListService } from './messages-list.service';

describe('MessagesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesListService]
    });
  });

  it('should be created', inject([MessagesListService], (service: MessagesListService) => {
    expect(service).toBeTruthy();
  }));
});
