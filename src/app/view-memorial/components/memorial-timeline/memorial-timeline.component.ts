import { Component, Input, OnInit } from '@angular/core';
import { Timeline } from '@shared/models/timeline.model';

@Component({
  selector: 'app-memorial-timeline',
  templateUrl: './memorial-timeline.component.html',
  styleUrls: ['./memorial-timeline.component.scss']
})
export class MemorialTimelineComponent implements OnInit {

  @Input() timeline: Timeline[];

  index = 0;

  get imgBackground() {
    return {
      background: `url(${this.timeline[this.index].asset_link})`,
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover'
    };
  }

  constructor() { }

  ngOnInit() {
  }

  onNavigate(dir: number) {
    this.index += dir;
  }

}
