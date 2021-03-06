import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LocationRange } from '@shared/models/location-range.model';

@Injectable({
  providedIn: 'root'
})
export class FindApiService {

  API_URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getInRange(range: LocationRange) {
    const path = `${this.API_URL}/locations/in_range?top=${range.top}&right=${range.right}&bottom=${range.bottom}&left=${range.left}`;
    return this.http.get(path);
  }

  getSelectedMarker(uuid: string) {
    const path = `${this.API_URL}/public_memorials/${uuid}`;
    return this.http.get(path);
  }

  searchMemorials(query: string) {
    const path = `${this.API_URL}/public_memorials/search?query=${encodeURI(query)}`;
    return this.http.get(path);
  }

  getPopularMemorials() {
    const path = `${this.API_URL}/public_memorials/popular`;
    return this.http.get(path);
  }
}
