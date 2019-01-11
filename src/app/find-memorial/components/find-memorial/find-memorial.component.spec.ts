import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { GetInRange } from '@store/find-memorial/actions/action.types';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { GeolocationService } from './../../services/geolocation.service';
import { MemorialResultCardComponent } from './../memorial-result-card/memorial-result-card.component';
import { FindMemorialComponent } from './find-memorial.component';

describe('FindMemorialComponent', () => {
  let component: FindMemorialComponent;
  let fixture: ComponentFixture<FindMemorialComponent>;

  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        FindMemorialComponent,
        SearchBarComponent,
        MemorialResultCardComponent
      ],
      imports: [
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState({
      latitude: 1,
      longitude: 1
    });
    fixture = TestBed.createComponent(FindMemorialComponent);
    component = fixture.componentInstance;
    component.markers$ = of([]);
    component.memorials$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get current location', inject([GeolocationService], (service) => {
    spyOn(service, 'findMe');
    component.ngOnInit();
    expect(service.findMe).toHaveBeenCalled();
  }));
  it('should get markers on bound change', fakeAsync(() => {
    spyOn(store, 'dispatch');
    const event = {l: {l: 1, j: 2}, j: {l: 1, j: 2}};
    component.onBoundChange(event);
    tick(500);
    expect(store.dispatch).toHaveBeenCalledWith(new GetInRange({top: 1, right: 1, bottom: 2, left: 2}));
  }));
});
