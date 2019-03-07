import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Constructor } from '@angular/material/core/typings/common-behaviors/constructor';
import { environment } from '@environments/environment';
import { MemoizedSelector, select, Store } from '@ngrx/store';
import { Memorial } from '@shared/models/memorial.model';
import { Photo } from '@shared/models/photo.model';
import { User } from '@shared/models/user.model';
import { getUser } from '@store/auth/auth.reducer';
import { Observable } from 'rxjs';

import { ApprovePhoto, DenyPhoto } from './../../../store/create-photos/photos.actions';

@Component({
  selector: 'app-photo-album-show',
  templateUrl: './photo-album-show.component.html',
  styleUrls: ['./photo-album-show.component.scss']
})
export class PhotoAlbumShowComponent implements OnInit {

  entities$: Observable<any>;
  ids$: Observable<string[]>;
  saving$: Observable<boolean>;
  saved$: Observable<boolean>;
  total$: Observable<number>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;

  entities: any;
  ids: string[];
  total: number;

  currentId: string;

  editing = false;

  editForm: FormGroup;

  user: User;

  get currentPhoto() {
    return this.entities[this.currentId];
  }

  get currentIndex() {
    return this.ids.findIndex(id => id === this.currentId);
  }

  get canEdit() {
    if (this.user.uuid === this.currentPhoto.user_id || this.user.uuid === this.data.memorial.user_id) {
      return true;
    } else {
      return false;
    }
  }

  get canApprove() {
    if (this.user.uuid === this.data.memorial.user_id && !this.data.memorial.public_photo) {
      return true;
    } else {
      return false;
    }
  }

  get needsApproval() {
    if (!this.currentPhoto.published && !this.currentPhoto.denied) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      selectedPhoto: string,
      entitySelector: MemoizedSelector<any, Photo[]>,
      idSelector: MemoizedSelector<any, string[]>,
      savingSelector: MemoizedSelector<any, boolean>,
      savedSelector: MemoizedSelector<any, boolean>,
      totalSelector: MemoizedSelector<any, number>,
      loadedSelector: MemoizedSelector<any, boolean>,
      loadingSelector: MemoizedSelector<any, boolean>,
      updateAction: Constructor<any>,
      getMoreAction: Constructor<any>,
      memorial: Memorial,
      context: string
    },
    public dialogRef: MatDialogRef<PhotoAlbumShowComponent>,
    private store: Store<any>,
    private fb: FormBuilder
  ) {
    this.entities$ = this.store.pipe(select(this.data.entitySelector));
    this.ids$ = this.store.pipe(select(this.data.idSelector));
    this.saving$ = this.store.pipe(select(this.data.savingSelector));
    this.saved$ = this.store.pipe(select(this.data.savedSelector));
    this.total$ = this.store.pipe(select(this.data.totalSelector));
    this.loaded$ = this.store.pipe(select(this.data.loadedSelector));
    this.loading$ = this.store.pipe(select(this.data.loadingSelector));
    this.entities$.subscribe(entities => this.entities = entities);
    this.ids$.subscribe(ids => this.ids = ids);
    this.currentId = this.data.selectedPhoto;
    this.store.pipe(select(getUser)).subscribe(user => this.user = user);
    this.total$.subscribe(total => this.total = total);
  }

  ngOnInit() {
  }

  buildForm(photo) {
    this.editForm = this.fb.group({
      title: photo.title,
      description: photo.description
    });
  }

  getPhotoSrc(link) {
    return `${environment.s3.url}${link}`;
  }

  next() {
    const index = this.ids.findIndex(id => id === this.currentId);
    if (index < this.ids.length - 1) {
      this.currentId = this.ids[index + 1];
    } else if (index === this.ids.length - 1 && this.ids.length < this.total) {
      let payload;
      switch (this.data.context) {
        case 'view':
        case 'create-all': {
          payload = {memorial_id: this.data.memorial.uuid, index: this.ids.length};
          break;
        }
        case 'approved': {
          payload = {memorial_id: this.data.memorial.uuid, approved: this.ids.length};
          break;
        }
        case 'denied': {
          payload = {memorial_id: this.data.memorial.uuid, denied: this.ids.length};
          break;
        }
        case 'need-approval': {
          payload = {memorial_id: this.data.memorial.uuid, waiting: this.ids.length};
          break;
        }
        default: break;
      }
      this.store.dispatch(new this.data.getMoreAction(payload));
      const sub = this.loaded$.subscribe(loaded => {
        if (loaded) {
          sub.unsubscribe();
          this.currentId = this.ids[index + 1];
        }
      });
    }
  }

  previous() {
    const index = this.ids.findIndex(id => id === this.currentId);
    if (index > 0) {
      this.currentId = this.ids[index - 1];
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.buildForm(this.currentPhoto);
    }
  }

  onApprove(photo_id) {
    const index = this.ids.findIndex(id => id === this.currentId);
    let newIndex;
    if (this.ids.length > 1 && index < this.ids.length - 1) {
      newIndex = index;
    } else if (this.ids.length > 1 && index === this.ids.length - 1) {
      newIndex = index - 1;
    } else if (this.ids.length === 1) {
      newIndex = -1;
    }
    const payload = {
      photo_id,
      memorial_id: this.data.memorial.uuid,
      body: {
        published: true,
        denied: false
      }
    };
    this.store.dispatch(new ApprovePhoto(payload));
    const sub = this.saved$.subscribe(saved => {
      if (saved) {
        sub.unsubscribe();
        if (newIndex > -1) {
          this.currentId = this.ids[newIndex];
        } else {
          this.dialogRef.close();
        }
      }
    });
  }

  onDeny(photo_id) {
    const index = this.ids.findIndex(id => id === this.currentId);
    let newIndex;
    if (this.ids.length > 1 && index < this.ids.length - 1) {
      newIndex = index;
    } else if (this.ids.length > 1 && index === this.ids.length - 1) {
      newIndex = index - 1;
    } else if (this.ids.length === 1) {
      newIndex = -1;
    }
    const payload = {
      photo_id,
      memorial_id: this.data.memorial.uuid,
      body: {
        published: false,
        denied: true
      }
    };
    this.store.dispatch(new DenyPhoto(payload));
    const sub = this.saved$.subscribe(saved => {
      if (saved) {
        sub.unsubscribe();
        if (newIndex > -1) {
          this.currentId = this.ids[newIndex];
        } else {
          this.dialogRef.close();
        }
      }
    });
  }

  updatePhoto(photo_id) {
    const payload = {
      photo_id,
      body: {
        title: this.editForm.value.title,
        description: this.editForm.value.description
      }
    };
    this.store.dispatch(new this.data.updateAction(payload));
    const sub = this.saved$.subscribe(saved => {
      if (saved) {
        this.editing = false;
        sub.unsubscribe();
      }
    });
  }

}
