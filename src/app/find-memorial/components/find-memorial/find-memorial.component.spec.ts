import { AgmCoreModule } from '@agm/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import * as fromStore from '../../../store/find-memorial';
import { GetPositionAction } from '../../../store/find-memorial/actions/get-position.action';
import { AppState } from '../../../store/models/app-state.model';
import { GeolocationService } from './../../services/geolocation.service';
import { FindMemorialComponent } from './find-memorial.component';

describe('FindMemorialComponent', () => {
  let component: FindMemorialComponent;
  let fixture: ComponentFixture<FindMemorialComponent>;

  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMemorialComponent ],
      imports: [
        AgmCoreModule.forRoot({}),
        StoreModule.forRoot({findMemorial: fromStore.findMemorialReducer}),
        EffectsModule.forRoot([])
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    store.dispatch(new GetPositionAction({latitude: 1, longitude: 1}));
    fixture = TestBed.createComponent(FindMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get lat and long', () => {
    expect(component.latitude.subscribe(res => expect(res).toBe(1)));
    expect(component.longitude.subscribe(res => expect(res).toBe(1)));
  });
  it('shoudl get current location', inject([GeolocationService], (service) => {
    spyOn(service, 'findMe');
    component.ngOnInit();
    expect(service.findMe).toHaveBeenCalled();
  }));
});
