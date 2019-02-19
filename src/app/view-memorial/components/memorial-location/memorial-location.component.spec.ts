import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationMarker } from '@shared/models/location-marker.model';
import { configureTestSuite } from 'ng-bullet';

import { MemorialLocationComponent } from './memorial-location.component';

describe('MemorialLocationComponent', () => {
  let component: MemorialLocationComponent;
  let fixture: ComponentFixture<MemorialLocationComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialLocationComponent ],
      imports: [
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialLocationComponent);
    component = fixture.componentInstance;
    component.location = {
      latitude: 123,
      longitude: 123,
    } as LocationMarker;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
