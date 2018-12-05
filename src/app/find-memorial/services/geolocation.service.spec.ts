import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { AppState } from '../../store/models/app-state.model';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let store: TestStore<AppState>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        GeolocationService,
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(navigator.geolocation, 'watchPosition').and.callFake(function() {
      const position = { coords: { latitude: 32, longitude: -96 } };
      arguments[0](position);
    });
  });

  it('should be created', inject([GeolocationService], (service: GeolocationService) => {
    expect(service).toBeTruthy();
  }));
  it('should return location', inject([GeolocationService], (service: GeolocationService) => {
    spyOn(store, 'dispatch');
    service.findMe();
    expect(store.dispatch).toHaveBeenCalled();
  }));
});
