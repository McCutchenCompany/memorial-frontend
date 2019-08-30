import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.staging';
import { Observable } from 'rxjs';

import { MilitaryHistory } from './../../shared/models/military.model';

@Injectable({
  providedIn: 'root'
})
export class EditMilitaryService {

  API_URL = `${environment.api}`;

  constructor(
    private http: HttpClient
  ) { }

  getMemorialMilitaryHistory(memorial_id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorials/${memorial_id}/military`;
    return this.http.get<MilitaryHistory[]>(path);
  }

  getMilitaryBranches(): Observable<any> {
    const path = `${this.API_URL}/military_branches`;
    return this.http.get(path);
  }

  addMilitaryBranch(memorial_id: string, military_branch_id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorial_military_branches`;
    const body = {memorial_id, military_branch_id};
    return this.http.post<MilitaryHistory[]>(path, body);
  }

  removeMilitaryBranch(memorial_military_branch_id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorial_military_branches/${memorial_military_branch_id}`;
    return this.http.delete<MilitaryHistory[]>(path);
  }

  getBranchMedals(branch_id: string): Observable<any[]> {
    const path = `${this.API_URL}/military_branches/${branch_id}/medals`;
    return this.http.get<any[]>(path);
  }

  addMedal(memorial_id: string, branch_id: string, medal_id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorial_medals`;
    const body = {memorial_id, branch_id, medal_id};
    return this.http.post<MilitaryHistory[]>(path, body);
  }

  removeMedal(id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/mem_military_branches_medals/${id}`;
    return this.http.delete<MilitaryHistory[]>(path);
  }

  updateMilitaryDates(id: string, body: {start_date: string, end_date: string}): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorial_military_branches/${id}`;
    return this.http.patch<MilitaryHistory[]>(path, body);
  }

  getBranchRanks(branch_id: string): Observable<any[]> {
    const path = `${this.API_URL}/military_branches/${branch_id}/ranks`;
    return this.http.get<any[]>(path);
  }

  updateBranchRank(memorial_military_branch_id: string, military_rank_id: string): Observable<MilitaryHistory[]> {
    const path = `${this.API_URL}/memorial_military_branches/${memorial_military_branch_id}/rank`;
    const body = {military_rank_id};
    return this.http.patch<MilitaryHistory[]>(path, body);
  }
}
