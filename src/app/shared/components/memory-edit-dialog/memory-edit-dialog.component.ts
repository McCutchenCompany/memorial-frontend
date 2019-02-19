import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { getViewSaved } from '@store/view-memorial';
import { Observable } from 'rxjs';

import { EditMemory } from './../../../store/view-memorial/view-memorial.actions';
import { getViewSaving } from './../../../store/view-memorial/view-memorial.reducer';
import { Memory } from './../../models/memory.model';

@Component({
  selector: 'app-memory-edit-dialog',
  templateUrl: './memory-edit-dialog.component.html',
  styleUrls: ['./memory-edit-dialog.component.scss']
})
export class MemoryEditDialogComponent implements OnInit {

  editMemoryForm: FormGroup;
  saving$: Observable<boolean>;

  constructor(
    private dialogRef: MatDialogRef<MemoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {context: string, memory: Memory},
    private store: Store<any>,
    private fb: FormBuilder
  ) {
    this.saving$ = this.store.pipe(select(getViewSaving));
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.editMemoryForm = this.fb.group({
      title: [this.data.memory.title, Validators.required],
      description: [this.data.memory.description, Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const payload = {
      memory_id: this.data.memory.uuid,
      title: this.editMemoryForm.value.title,
      description: this.editMemoryForm.value.description
    };
    this.store.dispatch(new EditMemory(payload));
    const sub = this.store.pipe(select(getViewSaved)).subscribe(saved => {
      if (saved) {
        this.dialogRef.close();
        sub.unsubscribe();
      }
    })
  }

}
