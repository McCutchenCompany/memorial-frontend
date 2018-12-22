import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
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
import { MemorialInfoComponent } from 'app/create-memorial/components/memorial-info/memorial-info.component';
import { TimelineFormComponent } from 'app/create-memorial/components/timeline-form/timeline-form.component';
import { configureTestSuite } from 'ng-bullet';

import { CreateTimelineComponent } from './../create-timeline/create-timeline.component';
import { CreateMemorialComponent } from './create-memorial.component';

describe('CreateMemorialComponent', () => {
  let component: CreateMemorialComponent;
  let fixture: ComponentFixture<CreateMemorialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateMemorialComponent,
        MemorialInfoComponent,
        ImageViewerComponent,
        UploadImageComponent,
        CreateTimelineComponent,
        TimelineFormComponent
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
    fixture = TestBed.createComponent(CreateMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
