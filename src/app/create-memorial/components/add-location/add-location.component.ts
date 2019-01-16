import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getCreatedSaving, getCreateMemorialLocation } from '@store/create-memorial';
import { SearchAddressSuccess, UpdateLocation } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() zoom: number;
  @Input() memorial_id: string;

  @Output() toMemories: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('search') searchElRef: ElementRef;

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
        const autocomplete = new window['google'].maps.places.Autocomplete(this.searchElRef.nativeElement, {
          types: ['address']
        });
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

  onCheckBounds(event) {
  }

  onNav() {
    this.toMemories.emit({tab: {textLabel: 'memories'}});
  }

}
