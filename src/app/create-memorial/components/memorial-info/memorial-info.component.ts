import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { DeleteMemorialImage } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';

@Component({
  selector: 'app-memorial-info',
  templateUrl: './memorial-info.component.html',
  styleUrls: ['./memorial-info.component.scss']
})
export class MemorialInfoComponent implements OnInit {

  @Input() memorialInfo: Memorial;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  memorialInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateMemorialState>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.memorialInfoForm = this.fb.group({
      first_name: [this.memorialInfo.first_name || '', Validators.required],
      middle_name: this.memorialInfo.middle_name || '',
      last_name: [this.memorialInfo.last_name || '', Validators.required],
      birth_date: [this.memorialInfo.birth_date, Validators.required],
      death_date: [this.memorialInfo.death_date, Validators.required],
      description: [this.memorialInfo.description || '', Validators.required]
    });
  }

  onSave() {
    this.save.emit(this.memorialInfoForm.value);
  }

  onRemove(payload) {
    this.store.dispatch(new DeleteMemorialImage(payload));
  }

}
