import { TestBed } from '@angular/core/testing';

import { PostingApiService } from './posting-api.service';

describe('PostingApiService', () => {
  let service: PostingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
