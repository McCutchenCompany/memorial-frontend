import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
      repeat: 'no-repeat',
      position: `${(this.timeline[this.index].posX * 1.5).toString()}px ${(this.timeline[this.index].posY * 1.5).toString()}px`,
      size: `cover`,
      scale: this.sanitizer.bypassSecurityTrustStyle(
        `scale(${this.timeline[this.index].scale / 100}) rotate(${this.timeline[this.index].rot}deg)`)
    };
  }

  get imgBackgroundMobile() {
    return {
      background: `url(${environment.s3.url}${this.timeline[this.index].asset_link})`,
      repeat: 'no-repeat',
      position: `${(this.timeline[this.index].posX).toString()}px ${(this.timeline[this.index].posY).toString()}px`,
      size: `cover`,
      scale: this.sanitizer.bypassSecurityTrustStyle(
        `scale(${this.timeline[this.index].scale / 100}) rotate(${this.timeline[this.index].rot}deg)`)
    };
  }

  get videoSrc() {
    if (this.timeline[this.index].asset_link.length === 11) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.timeline[this.index].asset_link}`);
    }
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onNavigate(dir: number) {
    this.index += dir;
  }

  onNavigateToIndex(index: number) {
    this.index = index;
  }

}
