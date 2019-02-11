import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { getCreatedSaving, getCreateMemorial, getEditingIds } from '@store/create-memorial';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { AddTimelineEntry } from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent implements OnInit {

  memorial$: Observable<any>;
  memorial: Memorial;

  @Output() toLocation: EventEmitter<any> = new EventEmitter<any>();

  editingIds$: Observable<string[]>;
  saving$: Observable<boolean>;

  constructor(
    private store: Store<CreateMemorialState>
  ) {
    this.editingIds$ = this.store.pipe(select(getEditingIds));
    this.saving$ = this.store.pipe(select(getCreatedSaving));
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        this.memorial = res.memorial;
      }
    });
  }

  ngOnInit() {
  }

  onAddEvent() {
    const payload = {
      uuid: this.memorial.uuid,
      body: {}
    };
    this.store.dispatch(new AddTimelineEntry(payload));
  }

}
