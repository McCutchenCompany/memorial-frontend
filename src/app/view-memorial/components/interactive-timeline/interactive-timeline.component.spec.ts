import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { configureTestSuite } from 'ng-bullet';

import { Memorial } from './../../../shared/models/memorial.model';
import { Timeline } from './../../../shared/models/timeline.model';
import { InteractiveTimelineComponent } from './interactive-timeline.component';

describe('InteractiveTimelineComponent', () => {
  let component: InteractiveTimelineComponent;
  let fixture: ComponentFixture<InteractiveTimelineComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveTimelineComponent ],
      imports: [
        MatIconModule,
        MatTooltipModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTimelineComponent);
    component = fixture.componentInstance;
    component.timeline = [
      {
        date: new Date(),
      } as Timeline
    ];
    component.memorial = {
      birth_date: new Date(),
      death_date: new Date()
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
