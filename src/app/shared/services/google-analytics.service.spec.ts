import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';

import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleAnalyticsService,
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });

  it('should be created', inject([GoogleAnalyticsService], (service: GoogleAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
