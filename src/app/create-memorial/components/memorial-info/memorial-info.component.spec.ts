import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { UploadImageComponent } from '@shared/components/upload-image/upload-image.component';
import { Memorial } from '@shared/models/memorial.model';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { ImageViewerComponent } from './../image-viewer/image-viewer.component';
import { MemorialInfoComponent } from './memorial-info.component';

describe('MemorialInfoComponent', () => {
  let component: MemorialInfoComponent;
  let fixture: ComponentFixture<MemorialInfoComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        MemorialInfoComponent,
        ImageViewerComponent,
        UploadImageComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule
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
    fixture = TestBed.createComponent(MemorialInfoComponent);
    component = fixture.componentInstance;
    component.memorialInfo = {
      first_name: 'Mitch',
      middle_name: 'Jacob',
      last_name: 'McCutchen',
      birth_date: new Date(),
      death_date: new Date(),
      description: ''
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
