import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { LocationMarker } from '@shared/models/location-marker.model';
import { Memorial } from '@shared/models/memorial.model';
import {
  InteractiveTimelineComponent,
} from 'app/view-memorial/components/interactive-timeline/interactive-timeline.component';
import { MemorialHeaderComponent } from 'app/view-memorial/components/memorial-header/memorial-header.component';
import { MemorialInfoComponent } from 'app/view-memorial/components/memorial-info/memorial-info.component';
import { MemorialLocationComponent } from 'app/view-memorial/components/memorial-location/memorial-location.component';
import { MemorialMemoriesComponent } from 'app/view-memorial/components/memorial-memories/memorial-memories.component';
import { MemorialTimelineComponent } from 'app/view-memorial/components/memorial-timeline/memorial-timeline.component';
import { MemoryCardComponent } from 'app/view-memorial/components/memory-card/memory-card.component';
import { configureTestSuite } from 'ng-bullet';

import { TestStore } from './../../../shared/testing/test-store';
import { ViewMemorialComponent } from './view-memorial.component';

describe('ViewMemorialComponent', () => {
  let component: ViewMemorialComponent;
  let fixture: ComponentFixture<ViewMemorialComponent>;
  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewMemorialComponent,
        MemorialHeaderComponent,
        MemorialInfoComponent,
        MemorialTimelineComponent,
        MemorialLocationComponent,
        InteractiveTimelineComponent,
        MemorialMemoriesComponent,
        MemoryCardComponent
      ],
      imports: [
        MatTooltipModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule,
        RouterTestingModule,
        MatProgressSpinnerModule
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
      memorial: {} as Memorial,
      timeline: [],
      location: {} as LocationMarker
    });
    fixture = TestBed.createComponent(ViewMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
