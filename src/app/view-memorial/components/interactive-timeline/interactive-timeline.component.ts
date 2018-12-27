import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timeline } from '@shared/models/timeline.model';

import { Memorial } from './../../../shared/models/memorial.model';

@Component({
  selector: 'app-interactive-timeline',
  templateUrl: './interactive-timeline.component.html',
  styleUrls: ['./interactive-timeline.component.scss']
})
export class InteractiveTimelineComponent implements OnInit {

  @Input() timeline: Timeline[];
  @Input() memorial: Memorial;
  @Input() currentDate;

  @Output() navigate: EventEmitter<number> = new EventEmitter<number>();

  years = [];

  constructor() { }

  ngOnInit() {
    this.separateYears();
  }

  separateYears() {
    this.years.push(new Date(this.memorial.birth_date).getFullYear());
    this.timeline.forEach(event => {
      const date = new Date(event.date);
      if (this.years.includes(date.getFullYear())) {
        return;
      }
      this.years.push(date.getFullYear());
    });
    this.years.push(new Date(this.memorial.death_date).getFullYear());
  }

  isCurrent(year) {
    if (new Date(this.currentDate).getFullYear() === year) {
      return true;
    } else {
      return false;
    }
  }

  numOfEvents(year) {
    let num = 0;
    this.timeline.forEach(event => {
      if (new Date(event.date).getFullYear() === year) {
        num += 1;
      }
    });
    if (num === 1) {
      return `${num} Event`;
    }
    return `${num} Events`;
  }

  onNavigate(year) {
    const index = this.timeline.findIndex(event => {
      if (new Date(event.date).getFullYear() === year) {
        return true;
      }
      return false;
    });
    if (index > -1)  {
      this.navigate.emit(index);
    }
  }

}
