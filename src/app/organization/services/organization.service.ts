import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Paginator } from '@shared/models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  API_URL = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  createOrganization(payload) {
    const path = `${this.API_URL}/organizations`;
    return this.http.post(path, payload);
  }

  getOrganization(id: string) {
    const path = `${this.API_URL}/organizations/${id}`;
    return this.http.get(path);
  }

  updateOrganization(id: string, payload) {
    const path = `${this.API_URL}/organizations/${id}`;
    return this.http.patch(path, payload);
  }

  getOrgMemorials(id: string, paginator: Paginator) {
    const path = `${this.API_URL}/organizations/${id}/memorials`
      + `?q=${paginator.q}&p=${paginator.p}&per_p=${paginator.per_p}&o_column=${paginator.o_column}&o_direction=${paginator.o_direction}`;
    return this.http.get(path);
  }

  createOrganizationMemorial(id: string) {
    const path = `${this.API_URL}/organizations/${id}/memorial`;
    return this.http.post(path, {});
  }

  joinOrganization(invite_link: string) {
    const path = `${this.API_URL}/user_organizations/join_org`;
    const body = {invite_link};
    return this.http.post(path, body);
  }
}
