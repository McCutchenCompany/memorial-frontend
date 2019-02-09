import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { MemoryCardComponent } from './../memory-card/memory-card.component';
import { MemorialMemoriesComponent } from './memorial-memories.component';

describe('MemorialMemoriesComponent', () => {
  let component: MemorialMemoriesComponent;
  let fixture: ComponentFixture<MemorialMemoriesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        MemorialMemoriesComponent,
        MemoryCardComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatSnackBarModule
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
    fixture = TestBed.createComponent(MemorialMemoriesComponent);
    component = fixture.componentInstance;
    component.memories = [];
    component.user = {
      uuid: '1234'
    } as User;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
