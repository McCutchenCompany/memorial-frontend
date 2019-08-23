import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MilitaryHistory } from '@shared/models/military.model';
import { getCreateMemorial } from '@store/create-memorial/create-memorial.reducer';
import { GetBranchMedals, GetMilitaryBranches } from '@store/edit-military/edit-military.actions';
import { getBranches, getMedals, getMedalsBranch, getMedalsLoading } from '@store/edit-military/edit-military.reducer';
import {
  AddMedal,
  AddMilitaryBranch,
  GetMilitaryHistory,
  RemoveMedal,
  RemoveMilitaryBranch,
} from '@store/military-history/military-history.actions';
import {
  getAllMilitaryHistory,
  getMilitaryHistoryEntities,
  getMilitaryHistorySaving,
} from '@store/military-history/military-history.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-military',
  templateUrl: './edit-military.component.html',
  styleUrls: ['./edit-military.component.scss']
})
export class EditMilitaryComponent implements OnInit {

  memorial$: Observable<any>;
  branches$: Observable<any>;
  militaryHistory$: Observable<MilitaryHistory[]>;
  historyEntities$: Observable<any>;
  savingHistory$: Observable<boolean>;
  medals$: Observable<any[]>;
  medalsLoading$: Observable<boolean>;

  medalsBranch = '';
  disabledUuid = [];
  militaryHistory: MilitaryHistory[];

  @ViewChildren('expansions') expansions;

  constructor(
    private store: Store<any>,
    private dialoag: MatDialog
  ) {
    this.memorial$ = this.store.pipe(select(getCreateMemorial));
    this.branches$ = this.store.pipe(select(getBranches));
    this.militaryHistory$ = this.store.pipe(select(getAllMilitaryHistory));
    this.savingHistory$ = this.store.pipe(select(getMilitaryHistorySaving));
    this.medals$ = this.store.pipe(select(getMedals));
    this.medalsLoading$ = this.store.pipe(select(getMedalsLoading));
    this.historyEntities$ = this.store.pipe(select(getMilitaryHistoryEntities));
    this.store.pipe(select(getMedalsBranch)).subscribe(res => {
      if (res) {
        this.medalsBranch = res;
      }
    });
    this.militaryHistory$.subscribe(res => {
      this.militaryHistory = res;
      if (res.length > 0) {
        this.disabledUuid = [];
        res.forEach((branch) => {
          this.disabledUuid.push(branch.military_branch.uuid);
        });
      }
    });
    this.store.dispatch(new GetMilitaryBranches());
    this.store.dispatch(new GetMilitaryHistory());
  }

  ngOnInit() {
  }

  addBranch(branch_id: string) {
    this.store.dispatch(new AddMilitaryBranch(branch_id));
  }

  removeBranch(branch, exp) {
    this.dialoag.open(ConfirmDialogComponent, {
      data: {
        message: `remove ${branch.name}?`
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        const index = this.militaryHistory.findIndex(history => {
          if (history.military_branch.uuid === branch.uuid) {
            return true;
          } else {
            return false;
          }
        });
        this.store.dispatch(new RemoveMilitaryBranch(this.militaryHistory[index].uuid));
        this.savingHistory$.subscribe(saving => {
          if (!saving) {
            const els = this.expansions.toArray();
            const expPanel: MatExpansionPanel = els[exp];
            expPanel.close();
          }
        });
      }
    });
  }

  getMedals(branch_id: string) {
    if (branch_id === this.medalsBranch) {
      return;
    } else {
      this.store.dispatch(new GetBranchMedals(branch_id));
    }
  }

  onAddMedal(body: {branch_id: string, medal_id: string}) {
    this.store.dispatch(new AddMedal(body));
  }

  onRemoveMedal(id: string) {
    this.store.dispatch(new RemoveMedal(id));
  }

}
