import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MemoryEditDialogComponent } from '@shared/components/memory-edit-dialog/memory-edit-dialog.component';
import { Memory } from '@shared/models/memory.model';
import { User } from '@shared/models/user.model';
import { ViewMemorialState } from '@store/models/view-memorial-state.model';
import { DeleteMemory } from '@store/view-memorial/view-memorial.actions';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit {

  @Input() memory: Memory;
  @Input() public: boolean;
  @Input() user: User;

  get displayAction() {
    if (
      this.user.uuid === this.memory.user_id
      && this.public
    ) {
      return true;
    } else if (
      !this.public
      && !this.memory.published
      && this.user.uuid === this.memory.user_id
    ) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private dialog: MatDialog,
    private store: Store<ViewMemorialState>
  ) { }

  ngOnInit() {
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'delete this memory? This is a permanent action.',
      },
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteMemory(this.memory.uuid));
      }
    });
  }

  onEdit() {
    this.dialog.open(MemoryEditDialogComponent, {
      data: {
        context: 'view',
        memory: this.memory
      }
    });
  }

}
