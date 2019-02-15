import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Memory } from '@shared/models/memory.model';
import { User } from '@shared/models/user.model';
import { ViewMemorialState } from '@store/models/view-memorial-state.model';
import { getViewSaved, getViewSaving } from '@store/view-memorial';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-memorial-memories',
  templateUrl: './memorial-memories.component.html',
  styleUrls: ['./memorial-memories.component.scss']
})
export class MemorialMemoriesComponent implements OnInit {

  @Input() memories: Memory[];
  @Input() memorial: Memorial;
  @Input() user: User;

  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  saving$: Observable<boolean>;
  saved$: Observable<boolean>;

  memoryForm: FormGroup;
  adding = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<ViewMemorialState>,
    public snackbar: MatSnackBar
  ) {
    this.saving$ = this.store.pipe(select(getViewSaving));
    this.saved$ = this.store.pipe(select(getViewSaved));
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.memoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  toggleForm() {
    this.adding = !this.adding;
  }

  onSubmit() {
    this.addEvent.emit(this.memoryForm.value);
    const sub = this.saved$.subscribe(res => {
      if (res) {
        this.memoryForm.reset();
        this.toggleForm();
        this.snackbar.open('Your memory has been added', '', {duration: 3000});
        sub.unsubscribe();
      }
    });
  }

  onLogin() {
    this.login.emit();
  }

}
