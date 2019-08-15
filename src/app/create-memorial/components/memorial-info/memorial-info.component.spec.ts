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
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { UploadImageComponent } from '@shared/components/upload-image/upload-image.component';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { ImageViewerComponent } from '@shared/components/image-viewer/image-viewer.component';
import { MemorialInfoComponent } from './memorial-info.component';

describe('MemorialInfoComponent', () => {
  let component: MemorialInfoComponent;
  let fixture: ComponentFixture<MemorialInfoComponent>;
  let store: TestStore<any>;

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
        RouterTestingModule,
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
    store = TestBed.get(Store);
    store.setState({
      memorial: {
        first_name: 'Mitch',
        middle_name: 'Jacob',
        last_name: 'McCutchen',
        birth_date: new Date(),
        death_date: new Date(),
        description: ''
      }
    });
    fixture = TestBed.createComponent(MemorialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
