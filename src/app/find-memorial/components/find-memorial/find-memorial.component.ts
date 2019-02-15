import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LocationMarker } from '@shared/models/location-marker.model';
import {
  ClearSearchMemorials,
  GetInRange,
  GetPopularMemorials,
  SearchMemorials,
} from '@store/find-memorial/actions/action.types';
import { getAllMemorialMarkers, getMarkerMemorials } from '@store/find-memorial/selectors/memorial-markers.selector';
import { getAllPopularMemorials } from '@store/find-memorial/selectors/popular-memorials.selector';
import { getLatitude, getLongitude, getSetLocation } from '@store/find-memorial/selectors/position.selector';
import { AppState } from '@store/models/app-state.model';
import { Observable } from 'rxjs';

import { GeolocationService } from '../../services/geolocation.service';
import { Memorial } from './../../../shared/models/memorial.model';
import { getMarkersLoading } from './../../../store/find-memorial/selectors/memorial-markers.selector';
import { getPermission } from './../../../store/find-memorial/selectors/position.selector';
import {
  getAllSearchMemorials,
  getSearchLoaded,
  getSearchLoading,
  getSearchQuery,
} from './../../../store/find-memorial/selectors/search-memorials.selector';

@Component({
  selector: 'app-find-memorial',
  templateUrl: './find-memorial.component.html',
  styleUrls: ['./find-memorial.component.scss']
})
export class FindMemorialComponent implements OnInit, OnDestroy {

  latitude$: Observable<number>;
  longitude$: Observable<number>;
  markers$: Observable<LocationMarker[]>;
  permission: Observable<boolean>;
  searchQuery$: Observable<any>;
  searchLoaded$: Observable<boolean>;
  searchLoading$: Observable<boolean>;
  markersLoading$: Observable<boolean>;
  locationSet$: Observable<boolean>;
  popularMemorials$: Observable<Memorial[]>;
  popularLoading$: Observable<boolean>;

  memorials$: Observable<Memorial[]>;

  hoveredMarker: LocationMarker = new LocationMarker();
  hoveredCard: Memorial = new Memorial();

  boundTimeout;
  displayMap = false;
  current = {ga: {j: 0, l: 0}, ma: {j: 0, l: 0}};

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
    private snackbar: MatSnackBar,
    private renderer: Renderer2
  ) {
    this.latitude$ = this.store.pipe(select(getLatitude));
    this.longitude$ = this.store.pipe(select(getLongitude));
    this.markers$ = this.store.pipe(select(getAllMemorialMarkers));
    this.searchQuery$ = this.store.pipe(select(getSearchQuery));
    this.searchLoaded$ = this.store.pipe(select(getSearchLoaded));
    this.searchLoading$ = this.store.pipe(select(getSearchLoading));
    this.markersLoading$ = this.store.pipe(select(getMarkersLoading));
    this.locationSet$ = this.store.pipe(select(getSetLocation));
    this.popularMemorials$ = this.store.pipe(select(getAllPopularMemorials));
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
    this.store.dispatch(new GetPopularMemorials());
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  onClick(event) {
    this.router.navigate(['/memorial', event.memorial_id]);
  }

  onBoundChange(event) {
    clearTimeout(this.boundTimeout);
    if (this.current.ga.j - event.ga.j > 0.05
      || this.current.ga.j - event.ga.j < -0.05
      || this.current.ma.j - event.ma.j > 0.1
      || this.current.ma.j - event.ma.j < -0.1) {
        if (event.ma.l - event.ma.j < .5 ) {
          this.current = event;
          this.boundTimeout = setTimeout(() => {
            const payload = {
              top: event.ma.l,
              right: event.ga.l,
              bottom: event.ma.j,
              left: event.ga.j
            };
            this.store.dispatch(new GetInRange(payload));
          }, 500);
        }
      }
  }

  openSnackbar() {
    this.snackbar.open(`You haven't given the map permission to find your location`, 'dismiss', {duration: 5000});
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

  toggleMap() {
    this.displayMap = !this.displayMap;
    if (this.displayMap) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

}
