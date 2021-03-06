import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { UploadImageComponent } from '@shared/components/upload-image/upload-image.component';
import { Timeline } from '@shared/models/timeline.model';
import { TestStore } from '@shared/testing/test-store';
import { ImageViewerComponent } from 'app/create-memorial/components/image-viewer/image-viewer.component';
import { configureTestSuite } from 'ng-bullet';

import { TimelineFormComponent } from './timeline-form.component';

describe('TimelineFormComponent', () => {
  let component: TimelineFormComponent;
  let fixture: ComponentFixture<TimelineFormComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimelineFormComponent,
        ImageViewerComponent,
        UploadImageComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatIconModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatCardModule,
        MatExpansionModule
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
    fixture = TestBed.createComponent(TimelineFormComponent);
    component = fixture.componentInstance;
    component.timeline = {
      date: new Date(),
      date_format: 'MMM dd, y',
      description: '',
      event: null,
      title: ''
    } as Timeline;
    component.editingIds = [''];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
