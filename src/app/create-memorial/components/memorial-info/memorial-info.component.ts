import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { getCreatedSaved, getCreateMemorial } from '@store/create-memorial';
import { DeleteMemorialImage, UpdateCreateMemorial } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-memorial-info',
  templateUrl: './memorial-info.component.html',
  styleUrls: ['./memorial-info.component.scss']
})
export class MemorialInfoComponent implements OnInit {

  memorial$: Observable<any>;
  memorialInfo: Memorial;
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() toTimeline: EventEmitter<any> = new EventEmitter<any>();

  memorialInfoForm: FormGroup;

  get imageFormat() {
    return {
      posX: this.memorialInfo.posX,
      posY: this.memorialInfo.posY,
      scale: this.memorialInfo.scale,
      rot: this.memorialInfo.rot
    };
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<CreateMemorialState>,
    private router: Router
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.memorial$.subscribe(res => {
      if (res.memorial) {
        this.memorialInfo = res.memorial;
        this.updateForm();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  updateForm() {
    this.memorialInfoForm.setValue({
      first_name: this.memorialInfo.first_name || '',
      middle_name: this.memorialInfo.middle_name || '',
      last_name: this.memorialInfo.last_name || '',
      birth_date: this.memorialInfo.birth_date,
      death_date: this.memorialInfo.death_date,
      description: this.memorialInfo.description || ''
    });
  }

  buildForm() {
    this.memorialInfoForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: '',
      last_name: ['', Validators.required],
      birth_date: [null, Validators.required],
      death_date: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave() {
    if (this.memorialInfoForm.dirty) {
      const payload = {
        uuid: this.memorialInfo.uuid,
        body: this.memorialInfoForm.value
      };
      this.store.dispatch(new UpdateCreateMemorial(payload));
      const sub = this.store.pipe(select(getCreatedSaved)).subscribe(res => {
        if (res) {
          this.router.navigate(['create', this.memorialInfo.uuid, 'timeline']);
          sub.unsubscribe();
        }
      });
    } else {
      this.router.navigate(['create', this.memorialInfo.uuid, 'timeline']);
    }
  }

  onRemove(payload) {
    this.store.dispatch(new DeleteMemorialImage(payload));
  }

}
