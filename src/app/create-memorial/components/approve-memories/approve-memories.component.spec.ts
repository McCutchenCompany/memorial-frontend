import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

import { ApprovalCardComponent } from './../approval-card/approval-card.component';
import { ApproveMemoriesComponent } from './approve-memories.component';

describe('ApproveMemoriesComponent', () => {
  let component: ApproveMemoriesComponent;
  let fixture: ComponentFixture<ApproveMemoriesComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApproveMemoriesComponent,
        ApprovalCardComponent
      ],
      imports: [
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMemoriesComponent);
    component = fixture.componentInstance;
    component.memories = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
