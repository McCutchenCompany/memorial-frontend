import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { UpdateUserMemorial } from '@store/auth/auth.actions';
import { getAuthSaved, getAuthSaving } from '@store/auth/auth.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-memorial-card',
  templateUrl: './my-memorial-card.component.html',
  styleUrls: ['./my-memorial-card.component.scss']
})
export class MyMemorialCardComponent implements OnInit {

  @Input() memorial: Memorial;

  saving$: Observable<boolean>;

  saving = false;

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
  ) {
    this.saving$ = this.store.pipe(select(getAuthSaving));
  }

  ngOnInit() {
  }

  togglePublish() {
    this.saving = true;
    const payload = {
      uuid: this.memorial.uuid,
      body: {
        published: !this.memorial.published
      }
    };
    this.store.dispatch(new UpdateUserMemorial(payload));
    const sub = this.store.pipe(select(getAuthSaved)).subscribe(saved => {
      if (saved) {
        sub.unsubscribe();
        this.saving = false;
      }
    });
  }

}
