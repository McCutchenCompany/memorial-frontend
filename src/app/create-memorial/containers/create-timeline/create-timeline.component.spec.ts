import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { UploadImageComponent } from '@shared/components/upload-image/upload-image.component';
import { TestStore } from '@shared/testing/test-store';
import { ImageViewerComponent } from 'app/create-memorial/components/image-viewer/image-viewer.component';
import { TimelineFormComponent } from 'app/create-memorial/components/timeline-form/timeline-form.component';
import { configureTestSuite } from 'ng-bullet';

import { CreateTimelineComponent } from './create-timeline.component';

describe('CreateTimelineComponent', () => {
  let component: CreateTimelineComponent;
  let fixture: ComponentFixture<CreateTimelineComponent>;
  let store: TestStore<any>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateTimelineComponent,
        TimelineFormComponent,
        ImageViewerComponent,
        UploadImageComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
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
    store = TestBed.get(Store);
    store.setState({
      memorial: {
        timeline: []
      }
    });
    fixture = TestBed.createComponent(CreateTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
