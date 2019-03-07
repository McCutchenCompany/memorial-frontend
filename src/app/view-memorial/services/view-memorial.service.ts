import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewMemorialService {

  API_URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getMemorial(id: string) {
    const path = `${this.API_URL}/public_memorials/${id}`;
    return this.http.get(path);
  }

  addMemory(memorial_id: string, body: {title: string, description: string}) {
    const path = `${this.API_URL}/memorials/${memorial_id}/memories`;
    return this.http.post(path, body);
  }

  deleteMemory(memory_id: string) {
    const path = `${this.API_URL}/memories/${memory_id}`;
    return this.http.delete(path);
  }

  editMemory(memory_id: string, title: string, description: string) {
    const path = `${this.API_URL}/memories/${memory_id}`;
    const body = {
      title,
      description
    };
    return this.http.patch(path, body);
  }

  getAlbumPhotos(memorial_id: string, index: number) {
    const path = `${this.API_URL}/photos/${memorial_id}?index=${index}`;
    return this.http.get(path);
  }
}
