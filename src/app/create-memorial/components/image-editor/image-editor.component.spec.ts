import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatSliderModule,
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { MockMatDialogRef } from './../../../shared/testing/mockDialogRef';
import { ImageEditorComponent } from './image-editor.component';

describe('ImageEditorComponent', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageEditorComponent ],
      imports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatSliderModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useClass: MockMatDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: Store,
          useClass: TestStore
        }
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          ImageEditorComponent
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 'test',
      type: 'test',
      image: 'test',
      format: {
        posY: 0,
        posX: 0,
        scale: 100,
        rot: 0
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
