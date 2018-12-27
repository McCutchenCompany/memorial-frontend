import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateMemorialService {

  API_URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  addLicense(user_id, licenses) {
    const path = `${this.API_URL}/users/${user_id}`;
    const body = {
      licenses
    };
    return this.http.patch(path, body);
  }

  createMemorial(user_id) {
    const path = `${this.API_URL}/memorials`;
    const body = {
      user_id
    };
    return this.http.post(path, body);
  }

  getCreateMemorial(uuid) {
    const path = `${this.API_URL}/memorials/${uuid}`;
    return this.http.get(path);
  }

  updateCreateMemorial(uuid, payload) {
    const path = `${this.API_URL}/memorials/${uuid}`;
    return this.http.patch(path, payload);
  }

  addTimelineEntry(memorial_id, payload) {
    const path = `${this.API_URL}/memorials/${memorial_id}/timeline`;
    return this.http.post(path, payload);
  }

  removeTimelineEntry(uuid) {
    const path = `${this.API_URL}/timelines/${uuid}`;
    return this.http.delete(path);
  }

  updateTimeline(memorial_id, timelines) {
    const path = `${this.API_URL}/memorials/${memorial_id}/update_timeline`;
    const body = {timelines: timelines};
    return this.http.patch(path, body);
  }

}
