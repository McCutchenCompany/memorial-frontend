import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Memory } from '@shared/models/memory.model';

@Component({
  selector: 'app-approve-memories',
  templateUrl: './approve-memories.component.html',
  styleUrls: ['./approve-memories.component.scss']
})
export class ApproveMemoriesComponent implements OnInit, OnChanges {

  @Input() memories: Memory[];
  @Input() public: boolean;

  @Output() switchPublic: EventEmitter<any> = new EventEmitter<any>();

  toApprove = [];
  approved = [];
  denied = [];

  showToApprove = false;
  showApproved = false;
  showDenied = false;

  constructor() { }

  ngOnInit() {
    this.separateMemories();
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
      public_post: !this.public
    };
    this.switchPublic.emit(body);
  }

}
