import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';

import { Memorial } from './../../../shared/models/memorial.model';
import { ToggleOrgMemorialPublished } from './../../../store/organization-memorials/org-memorials.actions';

@Component({
  selector: 'app-memorial-table',
  templateUrl: './memorial-table.component.html',
  styleUrls: ['./memorial-table.component.scss']
})
export class MemorialTableComponent implements OnChanges {

  @Input() memorials: Memorial[];
  @Input() pageInfo: Paginator;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() sort: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sorter: MatSort;

  displayColumns: string[] = [
    'published',
    'unlocked',
    'first_name',
    'middle_name',
    'last_name',
    'birth_date',
    'death_date'
  ];
  dataSource: MatTableDataSource<Memorial>;

  get page() {
    return {
      p: parseInt(this.pageInfo.p, 10) - 1,
      per_p: parseInt(this.pageInfo.per_p, 10)
    };
  }

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Memorial>(this.memorials);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorter;
    }, 50);
  }

  onSort(sort: MatSort) {
    const page = this.pageInfo;
    page.o_column = sort.direction ? sort.active : 'created_at';
    page.o_direction = sort.direction ? sort.direction : 'desc';
    this.sort.emit(page);
  }

  onTogglePublished(event, memorial) {
    const payload = {
      uuid: memorial.uuid,
      body: {
        published: event.checked
      }
    };
    this.store.dispatch(new ToggleOrgMemorialPublished(payload));
  }

  onRowClick(event, row) {
    if (event.target.className.indexOf('checkbox') < 0) {
      this.router.navigate(['/create', row.uuid]);
    }
  }

}
