import { Component, Input, OnInit } from '@angular/core';
import { Memorial } from '@shared/models/memorial.model';
import { Timeline } from '@shared/models/timeline.model';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() timeline: Timeline[];

  constructor() { }

  ngOnInit() {
  }

}
