import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

import { UploadImageComponent } from './upload-image.component';

describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadImageComponent
      ],
      imports: [
        MatDialogModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
