import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Memory } from '@shared/models/memory.model';
import { UpdateCreateMemorial } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { getCreateMemorial } from './../../../store/create-memorial/create-memorial.reducer';

@Component({
  selector: 'app-approve-memories',
  templateUrl: './approve-memories.component.html',
  styleUrls: ['./approve-memories.component.scss']
})
export class ApproveMemoriesComponent implements OnInit, OnChanges {

  memorial$: Observable<any>;
  memorialUUID: string;
  memories: Memory[];
  public: boolean;

  @Output() switchPublic: EventEmitter<any> = new EventEmitter<any>();

  toApprove = [];
  approved = [];
  denied = [];

  showToApprove = false;
  showApproved = false;
  showDenied = false;

  constructor(
    private store: Store<CreateMemorialState>
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
  }

  ngOnInit() {
    this.memorial$.subscribe(res => {
      if (res.memories) {
        this.memories = res.memories;
        this.public = res.memorial.public_post;
        this.memorialUUID = res.memorial.uuid;
        this.separateMemories();
      }
    });
    if (this.toApprove.length > 0) {
      this.showToApprove = true;
    }
  }

  ngOnChanges() {
    this.separateMemories();
  }

  separateMemories() {
    this.toApprove = [];
    this.approved = [];
    this.denied = [];
    if (this.public) {
      return this.approved = this.memories;
    }
    this.memories.forEach(memory => {
      if (memory.denied) {
        this.denied.push(memory);
      } else if (memory.published) {
        this.approved.push(memory);
      } else {
        this.toApprove.push(memory);
      }
    });
  }

  toggleExpand(toExpand: string) {
    switch (toExpand) {
      case 'toApprove': return this.showToApprove = !this.showToApprove;
      case 'denied': return this.showDenied = !this.showDenied;
      case 'approved': return this.showApproved = !this.showApproved;
    }
  }

  togglePublic() {
    const body = {
      uuid: this.memorialUUID,
      body: {
        public_post: !this.public
      }
    };
    this.store.dispatch(new UpdateCreateMemorial(body));
  }

}
