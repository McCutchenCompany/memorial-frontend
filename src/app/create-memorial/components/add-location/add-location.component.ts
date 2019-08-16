import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  getCreatedSaving,
  getCreateMemorial,
  getCreateMemorialLocation,
  getCreateSearchAddress,
} from '@store/create-memorial';
import { SearchAddress, SearchAddressSuccess, UpdateLocation } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  locationSearch$: Observable<any>;
  memorial$: Observable<any>;
  memorial_id: string;

  @ViewChild('search', {static: false}) searchElRef: ElementRef;

  memorialLocation$: Observable<any>;
  saving$: Observable<boolean>;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateMemorialState>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.memorialLocation$ = this.store.pipe(select(getCreateMemorialLocation));
    this.saving$ = this.store.pipe(select(getCreatedSaving));
    this.locationSearch$ = this.store.pipe(select(getCreateSearchAddress));
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        this.memorial_id = res.memorial.uuid;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      searchTerm: ''
    });
    this.apiLoader();
  }

  apiLoader() {
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new window['google'].maps.places.Autocomplete(this.searchElRef.nativeElement, {});
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            const payload = {
              address: place.formatted_address,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              zoom: 15
            };
            this.store.dispatch(new SearchAddressSuccess(payload));
          });
        });
      });
  }

  onSearch(event) {
    if (event.key === 'Enter' && this.searchForm.value.searchTerm.length > 0) {
      this.store.dispatch(new SearchAddress(this.searchForm.value.searchTerm));
    }
  }

  onMapClick(event) {
    if (event.coords) {
      const payload = {
        id: this.memorial_id,
        location: {
          latitude: event.coords.lat,
          longitude: event.coords.lng
        }
      };
      this.store.dispatch(new UpdateLocation(payload));
    }
  }

}
