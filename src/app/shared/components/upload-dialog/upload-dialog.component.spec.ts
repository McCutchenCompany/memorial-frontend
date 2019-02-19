import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatProgressBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Store } from '@ngrx/store';
import { MockMatDialogRef } from '@shared/testing/mockDialogRef';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { UploadDialogComponent } from './upload-dialog.component';

describe('UploadDialogComponent', () => {
  let component: UploadDialogComponent;
  let fixture: ComponentFixture<UploadDialogComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDialogComponent ],
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
      ],
      imports: [
        HttpClientTestingModule,
        MatProgressBarModule
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          UploadDialogComponent
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
