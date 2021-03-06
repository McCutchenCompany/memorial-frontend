import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  API_URL = environment.api;

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/form-data')};

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(memorial_id: string, image: File) {
    const path = `${this.API_URL}/memorials/${memorial_id}/image`;
    const _formData = new FormData();
    _formData.append('file', image, encodeURI(image.name));
    return this.http.post(path, _formData);
  }

  removeImage(memorial_id, route) {
    const path = `${this.API_URL}/memorials/${memorial_id}/remove_image?file=${route}`;
    return this.http.delete(path);
  }

  replaceImage(memorial_id: string, image: File) {
    const path = `${this.API_URL}/memorials/${memorial_id}/replace_image`;
    const _formData = new FormData();
    _formData.append('file', image, encodeURI(image.name));
    return this.http.patch(path, _formData);
  }

  replaceTimelineFile(timeline_id: string, file: File, type: string) {
    const path = `${this.API_URL}/timelines/${timeline_id}/replace_file?asset_type=${type}`;
    const _formData = new FormData();
    _formData.append('file', file, encodeURI(file.name));
    return this.http.post(path, _formData);
  }

  uploadTimelineFile(timeline_id: string, file: File, type: string) {
    const path = `${this.API_URL}/timelines/${timeline_id}/file?asset_type=${type}`;
    const _formData = new FormData();
    _formData.append('file', file, encodeURI(file.name));
    return this.http.post(path, _formData);
  }

  removeTimelineFile(timeline_id: string, route: string) {
    const path = `${this.API_URL}/timelines/${timeline_id}/remove_file?file=${route}`;
    return this.http.delete(path);
  }

  uploadAlbumPhoto(memorial_id: string, file: File) {
    const path = `${this.API_URL}/memorials/${memorial_id}/photo`;
    const _formData = new FormData();
    _formData.append('file', file, encodeURI(file.name));
    return this.http.post(path, _formData);
  }

  deleteAlbumPhoto(photo_id: string, file: string) {
    const path = `${this.API_URL}/photos/${photo_id}?file=${file}`;
    return this.http.delete(path);
  }

  uploadOrgImage(org_id: string, image: File) {
    const path = `${this.API_URL}/organizations/${org_id}/image`;
    const _formData = new FormData();
    _formData.append('file', image, encodeURI(image.name));
    return this.http.post(path, _formData);
  }

  replaceOrgImage(org_id: string, image: File) {
    const path = `${this.API_URL}/organizations/${org_id}/replace_image`;
    const _formData = new FormData();
    _formData.append('file', image, encodeURI(image.name));
    return this.http.patch(path, _formData);
  }

  removeOrgImage(org_id, route) {
    const path = `${this.API_URL}/organizations/${org_id}/remove_image?file=${route}`;
    return this.http.delete(path);
  }
}
