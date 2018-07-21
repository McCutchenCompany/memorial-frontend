import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import * as fromStore from '../../store/find-memorial';
import { AppState } from '../../store/models/app-state.model';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocationService],
      imports: [
        StoreModule.forRoot({findMemorial: fromStore.findMemorialReducer}),
        EffectsModule.forRoot([])
      ]
    });
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
