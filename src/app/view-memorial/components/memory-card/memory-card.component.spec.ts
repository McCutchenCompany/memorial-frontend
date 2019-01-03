import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { Memory } from '@shared/models/memory.model';
import { configureTestSuite } from 'ng-bullet';

import { MemoryCardComponent } from './memory-card.component';

describe('MemoryCardComponent', () => {
  let component: MemoryCardComponent;
  let fixture: ComponentFixture<MemoryCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryCardComponent ],
      imports: [
        MatCardModule
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
