import { TestBed } from '@angular/core/testing';

import { FollowerApiService } from './follower-api.service';

describe('FollowerApiService', () => {
  let service: FollowerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
