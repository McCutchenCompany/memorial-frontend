import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import {
  InteractiveTimelineComponent,
} from 'app/view-memorial/components/interactive-timeline/interactive-timeline.component';
import { MemorialHeaderComponent } from 'app/view-memorial/components/memorial-header/memorial-header.component';
import { MemorialInfoComponent } from 'app/view-memorial/components/memorial-info/memorial-info.component';
import { MemorialLocationComponent } from 'app/view-memorial/components/memorial-location/memorial-location.component';
import { MemorialTimelineComponent } from 'app/view-memorial/components/memorial-timeline/memorial-timeline.component';
import { configureTestSuite } from 'ng-bullet';

import { TestStore } from './../../../shared/testing/test-store';
import { ViewMemorialComponent } from './view-memorial.component';

describe('ViewMemorialComponent', () => {
  let component: ViewMemorialComponent;
  let fixture: ComponentFixture<ViewMemorialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewMemorialComponent,
        MemorialHeaderComponent,
        MemorialInfoComponent,
        MemorialTimelineComponent,
        MemorialLocationComponent,
        InteractiveTimelineComponent
      ],
      imports: [
        MatTooltipModule,
        MatIconModule,
        AgmCoreModule.forRoot({}),
        AgmJsMarkerClustererModule,
        RouterTestingModule
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
    fixture = TestBed.createComponent(ViewMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
