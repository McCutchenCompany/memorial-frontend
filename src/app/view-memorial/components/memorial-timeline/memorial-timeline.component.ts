import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Memorial } from '@shared/models/memorial.model';
import { Timeline } from '@shared/models/timeline.model';

@Component({
  selector: 'app-memorial-timeline',
  templateUrl: './memorial-timeline.component.html',
  styleUrls: ['./memorial-timeline.component.scss']
})
export class MemorialTimelineComponent implements OnInit {

  @Input() timeline: Timeline[];
  @Input() memorial: Memorial;

  index = 0;

  get imgBackground() {
    return {
      background: `url(${environment.s3.url}${this.timeline[this.index].asset_link})`,
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

  onNavigateToIndex(index: number) {
    this.index = index;
  }

}
