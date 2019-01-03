import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  API_URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getProfile(payload) {
    let params = '?';
    if (payload && payload.idTokenPayload) {
      if (payload.idTokenPayload.email) {
        params += `email=${payload.idTokenPayload.email}`;
      }
      if (payload.idTokenPayload.given_name || payload.idTokenPayload.first_name) {
        params += `&first_name=${payload.idTokenPayload.given_name || payload.idTokenPayload.first_name}`;
      }
      if (payload.idTokenPayload.family_name || payload.idTokenPayload.last_name) {
        params += `&last_name=${payload.idTokenPayload.family_name || payload.idTokenPayload.last_name}`;
      }
    }
    const path = `${this.API_URL}/users/profile${params}`;
    return this.http.get(path);
  }

  updateProfile(payload: any) {
    const path = `${this.API_URL}/users/${payload.uuid}`;
    const body = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email
    };
    return this.http.patch(path, body);
  }
}
