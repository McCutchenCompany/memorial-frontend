import { TestBed } from '@angular/core/testing';

import { FindApiService } from './find-api.service';

describe('FindApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindApiService = TestBed.get(FindApiService);
    expect(service).toBeTruthy();
  });
});
