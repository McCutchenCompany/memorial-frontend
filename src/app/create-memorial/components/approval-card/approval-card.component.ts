import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Memory } from '@shared/models/memory.model';
import { UpdateMemoryStatus } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.scss']
})
export class ApprovalCardComponent implements OnInit {

  @Input() memory: Memory;
  @Input() needsApproval: boolean;

  constructor(
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {
  }

  onApprove() {
    const payload = {
      memory_id: this.memory.uuid,
      body: {
        published: true
      }
    };
    this.store.dispatch(new UpdateMemoryStatus(payload));
  }

  onDeny() {
    const payload = {
      memory_id: this.memory.uuid,
      body: {
        denied: true
      }
    };
    this.store.dispatch(new UpdateMemoryStatus(payload));
  }

}
