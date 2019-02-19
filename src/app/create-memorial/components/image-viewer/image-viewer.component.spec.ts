import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { ImageViewerComponent } from './image-viewer.component';

describe('ImageViewerComponent', () => {
  let component: ImageViewerComponent;
  let fixture: ComponentFixture<ImageViewerComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        HttpClientTestingModule
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
    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
