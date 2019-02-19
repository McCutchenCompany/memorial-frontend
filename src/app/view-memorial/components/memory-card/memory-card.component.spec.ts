import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { Memory } from '@shared/models/memory.model';
import { User } from '@shared/models/user.model';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { MemoryCardComponent } from './memory-card.component';

describe('MemoryCardComponent', () => {
  let component: MemoryCardComponent;
  let fixture: ComponentFixture<MemoryCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryCardComponent ],
      imports: [
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule
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
    fixture = TestBed.createComponent(MemoryCardComponent);
    component = fixture.componentInstance;
    component.memory = {
      title: '',
      first_name: 'first',
      last_name: 'last',
      description: 'describe'
    } as Memory;
    component.user = {
      uuid: '1234'
    } as User;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
