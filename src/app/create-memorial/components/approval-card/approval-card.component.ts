import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Memory } from '@shared/models/memory.model';
import { getCreatedSaving } from '@store/create-memorial';
import { UpdateMemoryStatus } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.scss']
})
export class ApprovalCardComponent implements OnInit {

  @Input() memory: Memory;
  @Input() needsApproval: boolean;
  @Input() saving$: Observable<boolean>;

  constructor(
    private store: Store<CreateMemorialState>
  ) {
    this.saving$ = this.store.pipe(select(getCreatedSaving));
  }

  ngOnInit() {
  }

  onApprove() {
    const payload = {
      memory_id: this.memory.uuid,
      body: {
        published: true,
        denied: false
      }
    };
    this.store.dispatch(new UpdateMemoryStatus(payload));
  }

  onDeny() {
    const payload = {
      memory_id: this.memory.uuid,
      body: {
        published: false,
        denied: true
      }
    };
    this.store.dispatch(new UpdateMemoryStatus(payload));
  }

}
