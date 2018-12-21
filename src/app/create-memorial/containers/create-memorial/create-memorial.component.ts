import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GetCreateMemorial, UpdateCreateMemorial } from '@store/create-memorial/create-memorial.actions';
import { Observable } from 'rxjs';

import {
  getCreateLoaded,
  getCreateLoading,
  getCreateMemorial,
} from './../../../store/create-memorial/create-memorial.reducer';
import { CreateMemorialState } from './../../../store/models/create-memorial-state.model';

@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.scss']
})
export class CreateMemorialComponent implements OnInit {

  memorial$: Observable<any>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  memorialUUID;

  constructor(
    private route: ActivatedRoute,
    private store: Store<CreateMemorialState>
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.loading$ = this.store.pipe(select(getCreateLoading));
    this.loaded$ = this.store.pipe(select(getCreateLoaded));
    this.memorial$.subscribe(res => {
      if (res) {
        this.memorialUUID = res.memorial.uuid;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.store.dispatch(new GetCreateMemorial(params.id));
      }
    });
  }

  onUpdateMemorial(body) {
    const payload = {
      uuid: this.memorialUUID,
      body
    };
    this.store.dispatch(new UpdateCreateMemorial(payload));
  }

}
