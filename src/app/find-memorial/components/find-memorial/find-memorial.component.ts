import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetInRange } from '@store/find-memorial/actions/action.types';
import { getAllMemorialMarkers } from '@store/find-memorial/selectors/memorial-markers.selector';
import { getLatitude, getLongitude } from '@store/find-memorial/selectors/position.selector';
import { AppState } from '@store/models/app-state.model';
import { Observable } from 'rxjs';

import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-find-memorial',
  templateUrl: './find-memorial.component.html',
  styleUrls: ['./find-memorial.component.scss']
})
export class FindMemorialComponent implements OnInit {

  latitude$: Observable<number>;
  longitude$: Observable<number>;
  markers$: Observable<any[]>;

  boundTimeout;

  get latitude(): Observable<number> {
    return this.latitude$;
  }

  get longitude(): Observable<number> {
    return this.longitude$;
  }

  get markers(): Observable<any[]> {
    return this.markers$;
  }

  constructor(
    private geo: GeolocationService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.latitude$ = this.store.pipe(select(getLatitude));
    this.longitude$ = this.store.pipe(select(getLongitude));
    this.markers$ = this.store.pipe(select(getAllMemorialMarkers));
  }

  ngOnInit() {
    this.geo.findMe();
  }

  onClick(event) {
    this.router.navigate(['/memorial', event.memorial_id]);
  }

  onBoundChange(event) {
    clearTimeout(this.boundTimeout);
    if (event.l.l - event.l.j < .5) {
      this.boundTimeout = setTimeout(() => {
        const payload = {
          top: event.l.l,
          right: event.j.l,
          bottom: event.l.j,
          left: event.j.j
        };
        this.store.dispatch(new GetInRange(payload));
      }, 500);
    }
  }

}
