import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
      // this.matCard.scrollIntoView({behavior: 'smooth', inline: 'center'});
      return true;
    } else {
      return false;
    }
  }

  get imgFormat() {
    if (this.memorial.image) {
      return {
        src: `${environment.s3.url}${this.memorial.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100})
          rotate(${this.memorial.rot}deg)
          translate(${this.memorial.posX.toString()}px, ${this.memorial.posY.toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
      };
    }
  }

  get purpleHeart() {
    if (this.memorial.military.length > 0) {
      const index = this.memorial.military[0].honor_military_medals.findIndex(res => {
        return res.medal.uuid === 'c8e28734-abd2-431e-9403-30b24607d89f';
      });
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get silverStar() {
    if (this.memorial.military.length > 0) {
      const index = this.memorial.military[0].honor_military_medals.findIndex(res => {
        return res.medal.uuid === '321702fd-424f-42bd-8c18-6c008e341fb1';
      });
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get distinguished() {
    if (this.memorial.military.length > 0) {
      const index = this.memorial.military[0].honor_military_medals.findIndex(res => {
        return res.medal.uuid === '4a65e518-8b46-482e-a670-a5107a87ec88';
      });
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get honor() {
    if (this.memorial.military.length > 0) {
      const index = this.memorial.military[0].honor_military_medals.findIndex(res => {
        return res.medal.uuid === 'dc448992-6b2d-43dc-a5e2-46ef8d879a51';
      });
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
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
    private el: ElementRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.matCard = this.el.nativeElement.querySelector('mat-card');
  }

  onHover() {
    this.isHover = !this.isHover;
  }

}
