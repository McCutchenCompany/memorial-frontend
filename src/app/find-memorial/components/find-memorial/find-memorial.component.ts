import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getLatitude, getLongitude } from '../../../store/find-memorial/selectors/position.selector';
import { AppState } from '../../../store/models/app-state.model';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-find-memorial',
  templateUrl: './find-memorial.component.html',
  styleUrls: ['./find-memorial.component.scss']
})
export class FindMemorialComponent implements OnInit {

  latitude$: Observable<number>;
  longitude$: Observable<number>;

  get latitude(): Observable<number> {
    return this.latitude$;
  }

  get longitude(): Observable<number> {
    return this.longitude$;
  }

  constructor(
    private geo: GeolocationService,
    private store: Store<AppState>
  ) {
    this.latitude$ = this.store.select(getLatitude);
    this.longitude$ = this.store.select(getLongitude);
  }

  ngOnInit() {
    this.geo.findMe();
  }

}
