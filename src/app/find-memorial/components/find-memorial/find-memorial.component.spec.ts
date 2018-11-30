import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { GetInRange } from '@store/find-memorial/actions/action.types';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';

import { GeolocationService } from './../../services/geolocation.service';
import { FindMemorialComponent } from './find-memorial.component';

describe('FindMemorialComponent', () => {
  let component: FindMemorialComponent;
  let fixture: ComponentFixture<FindMemorialComponent>;

  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMemorialComponent ],
      imports: [
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get lat and long', () => {
    expect(component.latitude.subscribe(res => expect(res).toBe(1)));
    expect(component.longitude.subscribe(res => expect(res).toBe(1)));
  });
  it('should get current location', inject([GeolocationService], (service) => {
    spyOn(service, 'findMe');
    component.ngOnInit();
    expect(service.findMe).toHaveBeenCalled();
  }));
  it('should get markers on bound change', () => {
    spyOn(store, 'dispatch');
    const event = {l: {l: 1, j: 2}, j: {l: 1, j: 2}};
    component.onBoundChange(event);
    expect(store.dispatch).toHaveBeenCalledWith(new GetInRange({top: 1, right: 1, bottom: 2, left: 2}));
  });
});
