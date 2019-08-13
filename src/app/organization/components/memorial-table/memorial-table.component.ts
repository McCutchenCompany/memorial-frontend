import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Paginator } from '@shared/models/paginator.model';

import { Memorial } from './../../../shared/models/memorial.model';

@Component({
  selector: 'app-memorial-table',
  templateUrl: './memorial-table.component.html',
  styleUrls: ['./memorial-table.component.scss']
})
export class MemorialTableComponent implements OnChanges {

  @Input() memorials: Memorial[];
  @Input() pageInfo: Paginator;
  @Input() loading: boolean;
  @Output() sort: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sorter: MatSort;

  displayColumns: string[] = [
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
    private store: Store<any>
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

}
