import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { getCreateMemorial } from '@store/create-memorial/create-memorial.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-memorial-share',
  templateUrl: './memorial-share.component.html',
  styleUrls: ['./memorial-share.component.scss']
})
export class MemorialShareComponent implements OnInit {

  memorial$: Observable<any>;
  memorial: Memorial;

  get join_link() {
    return `${environment.url}memorial/edit/${this.memorial.invite_link}`;
  }

  get display_link() {
    return `${environment.url}memorial/edit`;
  }


  constructor(
    private store: Store<any>
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        this.memorial = res.memorial;
      }
    });
  }

  ngOnInit() {
  }

  showToolTip(tooltip: MatTooltip) {
    tooltip.message = 'Copied';
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.message = 'Copy';
    }, 1000);
  }
}
