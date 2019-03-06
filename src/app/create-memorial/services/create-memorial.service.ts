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

  addLicense(token, quantity, price, discount?) {
    const path = `${this.API_URL}/billing/purchase`;
    const body: any = {
      stripeToken: token,
      quantity: quantity,
      price: price
    };
    if (discount) {
      body.discount = discount;
    }
    return this.http.post(path, body);
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

  updateSingleTimeline(timeline_id, body) {
    const path = `${this.API_URL}/timelines/${timeline_id}`;
    return this.http.patch(path, body);
  }

  updateLocation(memorial_id, location: {latitude: number, longitude: number}) {
    const path = `${this.API_URL}/memorials/${memorial_id}/location`;
    const body = location;
    return this.http.post(path, body);
  }

  updateMemoryStatus(memory_id, body) {
    const path = `${this.API_URL}/memories/${memory_id}`;
    return this.http.patch(path, body);
  }

  checkDiscount(code) {
    const path = `${this.API_URL}/billing/${code}/check_discount`;
    return this.http.get(path);
  }

  sendSupportEmail(payload: {email: string, subject: string, content: string}) {
    const path = `${this.API_URL}/response/support`;
    return this.http.post(path, payload);
  }

  sendBugEmail(payload: {email: string, subject: string, content: string}) {
    const path = `${this.API_URL}/response/bug`;
    return this.http.post(path, payload);
  }

  searchLocation(query) {
    const path = `${this.API_URL}/find_places?query=${encodeURI(query)}`;
    return this.http.get(path);
  }

  getCreatePhotos(payload: {memorial_id: string, approved?: number, denied?: number, waiting?: number, index?: number}) {
    const path = `${this.API_URL}/memorials/${payload.memorial_id}/photos?
      ${payload.approved ? 'approved=' + payload.approved + '&' : ''}
      ${payload.denied ? 'denied=' + payload.denied + '&' : ''}
      ${payload.waiting ? 'waiting=' + payload.waiting + '&' : ''}
      ${payload.index ? 'index=' + payload.index : ''}`;
    return this.http.get(path);
  }

  updatePhoto(photo_id: string, payload: {title?: string, description?: string, published?: boolean, denied?: boolean}) {
    const path = `${this.API_URL}/photos/${photo_id}`;
    return this.http.patch(path, payload);
  }

  updatePhotoApproval(photo_id: string, memorial_id: string, payload: {published: boolean, denied: boolean}) {
    const path = `${this.API_URL}/memorials/${memorial_id}/approve_photo/${photo_id}`;
    return this.http.patch(path, payload);
  }

}
