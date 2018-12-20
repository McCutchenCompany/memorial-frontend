import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { UploadDialogComponent } from '@shared/components/upload-dialog/upload-dialog.component';
import { UpdateCreateMemorial } from '@store/create-memorial/create-memorial.actions';
import { CreateMemorialState } from '@store/models/create-memorial-state.model';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private store: Store<CreateMemorialState>
  ) { }

  uploadImage(dialog: MatDialogRef<UploadDialogComponent>, memorial_id: string, image: File, timeline_id?: string) {
    const bucket = new S3(
      {
        accessKeyId: environment.s3.accessKeyId,
        secretAccessKey: environment.s3.secretAccessKey,
        region: environment.s3.region
      }
    );

    const params = {
      Bucket: environment.s3.bucket,
      Key: `${memorial_id}/` + image.name,
      Body: image
    };

    bucket.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your image: ', err);
        return false;
      }
      console.log('Successfully uploaded file', data);
      if (timeline_id) {
        // TODO: Add to timeline
      } else {
        const body = {
          uuid: memorial_id,
          body: {
            image: `${memorial_id}/` + image.name
          }
        };
        this.store.dispatch(new UpdateCreateMemorial(body));
        dialog.close();
      }
      return true;
    });
  }

  removeImage(memorialId, route, timeline_id?) {
    const bucket = new S3(
      {
        accessKeyId: environment.s3.accessKeyId,
        secretAccessKey: environment.s3.secretAccessKey,
        region: environment.s3.region
      }
    );

    const params = {
      Bucket: environment.s3.bucket,
      Key: route
    };

    bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log('There was an error deleting your image: ', err);
        return false;
      }
      if (timeline_id) {
        // TODO: Remove from timeline
      } else {
        const body = {
          uuid: memorialId,
          body: {
            image: null
          }
        };
        this.store.dispatch(new UpdateCreateMemorial(body));
      }
      return true;
    });
  }
}
