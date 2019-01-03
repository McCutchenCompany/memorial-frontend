import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LocationMarker } from '@shared/models/location-marker.model';
import { ClearSearchMemorials, GetInRange, SearchMemorials } from '@store/find-memorial/actions/action.types';
import { getAllMemorialMarkers, getMarkerMemorials } from '@store/find-memorial/selectors/memorial-markers.selector';
import { getLatitude, getLongitude } from '@store/find-memorial/selectors/position.selector';
import { AppState } from '@store/models/app-state.model';
import { Observable } from 'rxjs';

import { GeolocationService } from '../../services/geolocation.service';
import { Memorial } from './../../../shared/models/memorial.model';
import { getPermission } from './../../../store/find-memorial/selectors/position.selector';
import {
  getAllSearchMemorials,
  getSearchLoaded,
  getSearchQuery,
} from './../../../store/find-memorial/selectors/search-memorials.selector';

@Component({
  selector: 'app-find-memorial',
  templateUrl: './find-memorial.component.html',
  styleUrls: ['./find-memorial.component.scss']
})
export class FindMemorialComponent implements OnInit {

  latitude$: Observable<number>;
  longitude$: Observable<number>;
  markers$: Observable<LocationMarker[]>;
  permission: Observable<boolean>;
  searchQuery$: Observable<any>;
  searchLoaded$: Observable<boolean>;

  memorials$: Observable<Memorial[]>;

  hoveredMarker: LocationMarker = new LocationMarker();
  hoveredCard: Memorial = new Memorial();

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

  markerIcon(marker) {
    if (this.hoveredCard.uuid === marker.memorial_id || this.hoveredMarker.uuid === marker.uuid) {
      return 'assets/imgs/marker-hover.svg';
    } else {
      return 'assets/imgs/marker-initial.svg';
    }
  }

  constructor(
    private geo: GeolocationService,
    private store: Store<AppState>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.latitude$ = this.store.pipe(select(getLatitude));
    this.longitude$ = this.store.pipe(select(getLongitude));
    this.markers$ = this.store.pipe(select(getAllMemorialMarkers));
    this.searchQuery$ = this.store.pipe(select(getSearchQuery));
    this.searchLoaded$ = this.store.pipe(select(getSearchLoaded));
    this.searchQuery$.subscribe(query => {
      if (query) {
        this.memorials$ = this.store.pipe(select(getAllSearchMemorials));
      } else {
        this.memorials$ = this.store.pipe(select(getMarkerMemorials));
      }
    });
    this.store.pipe(select(getPermission)).subscribe(permission => {
      if (!permission) {
        this.openSnackbar();
      }
    });
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

  openSnackbar() {
    this.snackbar.open(`You haven't given the `);
  }

  onSearch(search) {
    if (search.query.length === 0) {
      return this.store.dispatch(new ClearSearchMemorials());
    }
    this.store.dispatch(new SearchMemorials(search.query));
  }

  onMarkerHover(marker) {
    this.hoveredMarker = marker;
  }

  onMarkerLeave() {
    this.hoveredMarker = new LocationMarker();
  }

  onCardHover(memorial?: Memorial) {
    if (memorial) {
      this.hoveredCard = memorial;
    } else {
      this.hoveredCard = new Memorial;
    }
  }

}
