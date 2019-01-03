import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { Memory } from '@shared/models/memory.model';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { ApprovalCardComponent } from './approval-card.component';

describe('ApprovalCardComponent', () => {
  let component: ApprovalCardComponent;
  let fixture: ComponentFixture<ApprovalCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalCardComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule
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
    fixture = TestBed.createComponent(ApprovalCardComponent);
    component = fixture.componentInstance;
    component.memory = {
      title: 'test',
      first_name: 'first',
      last_name: 'last',
      description: 'test description'
    } as Memory;
    component.needsApproval = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
