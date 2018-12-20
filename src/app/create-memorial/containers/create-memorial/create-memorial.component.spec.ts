import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { MemorialInfoComponent } from 'app/create-memorial/components/memorial-info/memorial-info.component';
import { configureTestSuite } from 'ng-bullet';

import { CreateMemorialComponent } from './create-memorial.component';

describe('CreateMemorialComponent', () => {
  let component: CreateMemorialComponent;
  let fixture: ComponentFixture<CreateMemorialComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateMemorialComponent,
        MemorialInfoComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
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
