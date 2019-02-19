import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { getEmailState } from '@store/app';
import { SendBugEmail, SendSupportEmail } from '@store/app/app.actions';
import { AppState } from '@store/models/app-state.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss']
})
export class ResponseDialogComponent implements OnInit {

  responseForm: FormGroup;
  sending$: Observable<boolean>;
  error;

  constructor(
    private dialogRef: MatDialogRef<ResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.sending$ = this.store.pipe(select(getEmailState)).pipe(map(state => state.sending));
  }

  ngOnInit() {
    this.buildForm();
  }

  onClose() {
    this.dialogRef.close();
  }

  buildForm() {
    this.responseForm = this.fb.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSend() {
    if (this.data.type === 'support') {
      this.store.dispatch(new SendSupportEmail(this.responseForm.value));
    } else if (this.data.type === 'bug') {
      this.store.dispatch(new SendBugEmail(this.responseForm.value));
    }
    const sub = this.store.pipe(select(getEmailState)).subscribe(state => {
      if (state.sent) {
        this.dialogRef.close();
        sub.unsubscribe();
      } else if (state.error) {
        sub.unsubscribe();
      }
    });
  }

}
