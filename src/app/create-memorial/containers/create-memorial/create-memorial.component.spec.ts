import { AgmCoreModule } from '@agm/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { UploadImageComponent } from '@shared/components/upload-image/upload-image.component';
import { LocationMarker } from '@shared/models/location-marker.model';
import { Memorial } from '@shared/models/memorial.model';
import { TestStore } from '@shared/testing/test-store';
import { ApprovalCardComponent } from 'app/create-memorial/components/approval-card/approval-card.component';
import { ApproveMemoriesComponent } from 'app/create-memorial/components/approve-memories/approve-memories.component';
import { ImageViewerComponent } from 'app/create-memorial/components/image-viewer/image-viewer.component';
import { MemorialInfoComponent } from 'app/create-memorial/components/memorial-info/memorial-info.component';
import { TimelineFormComponent } from 'app/create-memorial/components/timeline-form/timeline-form.component';
import { configureTestSuite } from 'ng-bullet';

import { FooterComponent } from './../../../shared/components/footer/footer.component';
import { AddLocationComponent } from './../../components/add-location/add-location.component';
import { CreateNavComponent } from './../create-nav/create-nav.component';
import { CreateTimelineComponent } from './../create-timeline/create-timeline.component';
import { CreateMemorialComponent } from './create-memorial.component';

describe('CreateMemorialComponent', () => {
  let component: CreateMemorialComponent;
  let fixture: ComponentFixture<CreateMemorialComponent>;
  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateMemorialComponent,
        MemorialInfoComponent,
        ImageViewerComponent,
        UploadImageComponent,
        CreateTimelineComponent,
        TimelineFormComponent,
        AddLocationComponent,
        ApproveMemoriesComponent,
        ApprovalCardComponent,
        CreateNavComponent,
        FooterComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        MatSidenavModule,
        MatDividerModule,
        RouterTestingModule,
        NoopAnimationsModule,
        AgmCoreModule.forRoot({})
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
      location: {} as LocationMarker,
      timeline: []
    });
    fixture = TestBed.createComponent(CreateMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
