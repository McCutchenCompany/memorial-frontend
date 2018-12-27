import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { Memorial } from '@shared/models/memorial.model';
import { Timeline } from '@shared/models/timeline.model';
import { configureTestSuite } from 'ng-bullet';

import { InteractiveTimelineComponent } from '../interactive-timeline/interactive-timeline.component';
import { MemorialTimelineComponent } from './memorial-timeline.component';

describe('MemorialTimelineComponent', () => {
  let component: MemorialTimelineComponent;
  let fixture: ComponentFixture<MemorialTimelineComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialTimelineComponent, InteractiveTimelineComponent ],
      imports: [
        MatIconModule,
        MatTooltipModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialTimelineComponent);
    component = fixture.componentInstance;
    component.timeline = [
      {
        asset_link: 'link.com',
        date: new Date(),
        date_format: 'MMM, y'
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
  it('should navigate', () => {
    expect(component.index).toBe(0);
    component.onNavigate(1);
    expect(component.index).toBe(1);
    component.onNavigate(-1);
    expect(component.index).toBe(0);
  });
});
