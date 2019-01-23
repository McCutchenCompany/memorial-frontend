import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { UpdateUserMemorial } from '@store/auth/auth.actions';

@Component({
  selector: 'app-my-memorial-card',
  templateUrl: './my-memorial-card.component.html',
  styleUrls: ['./my-memorial-card.component.scss']
})
export class MyMemorialCardComponent implements OnInit {

  @Input() memorial: Memorial;

  get imgBackground() {
    if (this.memorial.image) {
      return {
        background: `url(${environment.s3.url}${this.memorial.image})`,
        repeat: 'no-repeat',
        position: `${this.memorial.posX.toString()}px ${this.memorial.posY.toString()}px`,
        size: `cover`,
        scale: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.memorial.scale / 100}) rotate(${this.memorial.rot}deg)`)
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
    if (name === '') {
      name = 'New Memorial';
    }
    return name;
  }

  constructor(
    private store: Store<any>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  togglePublish() {
    const payload = {
      uuid: this.memorial.uuid,
      body: {
        published: !this.memorial.published
      }
    };
    this.store.dispatch(new UpdateUserMemorial(payload));
  }

}
