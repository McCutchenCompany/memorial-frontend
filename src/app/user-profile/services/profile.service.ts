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

  getProfile() {
    const path = `${this.API_URL}/users/profile`;
    return this.http.get(path);
  }

  updateProfile(payload: any) {
    console.log('service', payload);
    const path = `${this.API_URL}/users/${payload.uuid}`;
    const body = {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email
    };
    return this.http.patch(path, body);
  }
}
