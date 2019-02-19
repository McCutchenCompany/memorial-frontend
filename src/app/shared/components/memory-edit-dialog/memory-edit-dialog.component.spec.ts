import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatDialogRef, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { Memory } from './../../models/memory.model';
import { MockMatDialogRef } from './../../testing/mockDialogRef';
import { MemoryEditDialogComponent } from './memory-edit-dialog.component';

describe('MemoryEditDialogComponent', () => {
  let component: MemoryEditDialogComponent;
  let fixture: ComponentFixture<MemoryEditDialogComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryEditDialogComponent ],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
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
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          MemoryEditDialogComponent
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryEditDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      context: 'view',
      memory: {
        title: 'test',
        description: 'test'
      } as Memory
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
