import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { Timeline } from '@shared/models/timeline.model';
import { configureTestSuite } from 'ng-bullet';

import { MemorialTimelineComponent } from './memorial-timeline.component';

describe('MemorialTimelineComponent', () => {
  let component: MemorialTimelineComponent;
  let fixture: ComponentFixture<MemorialTimelineComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialTimelineComponent ],
      imports: [
        MatIconModule
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
