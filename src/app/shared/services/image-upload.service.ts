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
}
