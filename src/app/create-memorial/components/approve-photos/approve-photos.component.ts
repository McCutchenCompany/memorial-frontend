import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCreateMemorial } from '@store/create-memorial';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import { Observable } from 'rxjs';

import { UpdateCreateMemorial } from './../../../store/create-memorial/create-memorial.actions';
import { GetCreatePhotos } from './../../../store/create-photos/photos.actions';

@Component({
  selector: 'app-approve-photos',
  templateUrl: './approve-photos.component.html',
  styleUrls: ['./approve-photos.component.scss']
})
export class ApprovePhotosComponent implements OnInit {

  memorial$: Observable<any>;

  memorialUUID;
  public: boolean;

  constructor(
    private store: Store<CreateMemorialState>
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.memorial$.subscribe(memorial => {
      this.memorialUUID = memorial.memorial.uuid;
      this.public = memorial.memorial.public_photo;
      this.store.dispatch(new GetCreatePhotos({memorial_id: this.memorialUUID}));
    });
  }

  ngOnInit() {
  }

  togglePublic() {
    const body = {
      uuid: this.memorialUUID,
      body: {
        public_photo: !this.public
      }
    };
    this.store.dispatch(new UpdateCreateMemorial(body));
  }

}
