import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { Memorial } from '@shared/models/memorial.model';

@Component({
  selector: 'app-memorial-result-card',
  templateUrl: './memorial-result-card.component.html',
  styleUrls: ['./memorial-result-card.component.scss']
})
export class MemorialResultCardComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() markerHover: string;

  isHover = false;
  matCard;

  get hover() {
    if (this.isHover) {
      return true;
    } else if (this.markerHover === this.memorial.uuid) {
      this.matCard.scrollIntoView({behavior: 'smooth', inline: 'center'});
      return true;
    } else {
      return false;
    }
  }

  get imgBackground() {
    if (this.memorial.image) {
      return {
        background: `url(${environment.s3.url}${this.memorial.image})`,
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      };
    } else {
      return {
        background: 'url(assets/imgs/default-memorial.jpg)',
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      };
    }
  }

  get name() {
    let name = '';
    if (this.memorial.first_name) {
      name += `${this.memorial.first_name}`;
    }
    if (this.memorial.middle_name) {
      name += ` ${this.memorial.middle_name}`;
    }
    if (this.memorial.last_name) {
      name += ` ${this.memorial.last_name}`;
    }
    return name;
  }

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.matCard = this.el.nativeElement.querySelector('mat-card');
  }

  onHover() {
    this.isHover = !this.isHover;
  }

}
