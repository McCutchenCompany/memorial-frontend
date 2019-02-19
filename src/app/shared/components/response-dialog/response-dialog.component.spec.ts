import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogRef, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { MockMatDialogRef } from './../../testing/mockDialogRef';
import { ResponseDialogComponent } from './response-dialog.component';

describe('ResponseDialogComponent', () => {
  let component: ResponseDialogComponent;
  let fixture: ComponentFixture<ResponseDialogComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseDialogComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
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
      ],
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          ResponseDialogComponent
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
