import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

import { ApprovalCardComponent } from './../approval-card/approval-card.component';
import { ApproveMemoriesComponent } from './approve-memories.component';

describe('ApproveMemoriesComponent', () => {
  let component: ApproveMemoriesComponent;
  let fixture: ComponentFixture<ApproveMemoriesComponent>;
  let store: TestStore<any>;

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
        MatProgressSpinnerModule,
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
    store = TestBed.get(Store);
    store.setState({
      latitude: 12,
      longitude: 10,
      zoom: 1,
      memorial: {
        uuid: '1234'
      }
    });
    fixture = TestBed.createComponent(ApproveMemoriesComponent);
    component = fixture.componentInstance;
    component.memories = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
