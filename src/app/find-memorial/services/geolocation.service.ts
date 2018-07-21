import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetPositionAction } from '../../store/find-memorial/actions/get-position.action';
import { AppState } from './../../store/models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private store: Store<AppState>
  ) { }

  findMe() {
    navigator.geolocation.watchPosition(position => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
        heading: position.coords.heading,
        speed: position.coords.speed
      };
      this.store.dispatch(new GetPositionAction(location));
    });
  }
}