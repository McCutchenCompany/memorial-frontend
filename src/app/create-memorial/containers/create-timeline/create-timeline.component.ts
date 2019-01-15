import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Timeline } from '@shared/models/timeline.model';
import { getCreatedSaving, getEditingIds } from '@store/create-memorial';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { AddTimelineEntry } from './../../../store/create-memorial/create-memorial.actions';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent implements OnInit {

  @Input() memorial: Memorial;
  @Input() timeline: Timeline[];

  @Output() toLocation: EventEmitter<any> = new EventEmitter<any>();

  editingIds$: Observable<string[]>;
  saving$: Observable<boolean>;

  constructor(
    private store: Store<CreateMemorialState>
  ) {
    this.editingIds$ = this.store.pipe(select(getEditingIds));
    this.saving$ = this.store.pipe(select(getCreatedSaving));
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

  onNavToLocation() {
    this.toLocation.emit({tab: {textLabel: 'location'}});
  }

}
