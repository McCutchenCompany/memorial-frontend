import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Paginator } from '@shared/models/paginator.model';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent implements OnChanges {

  @Input() users: User[];
  @Input() pageInfo: Paginator;
  @Input() loading: boolean;
  @Input() saving: boolean;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort, {static: false})
  sorter: MatSort;

  displayColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'role'
  ];
  dataSource: MatTableDataSource<User>;

  get page() {
    return {
      p: parseInt(this.pageInfo.p, 10) - 1,
      per_p: parseInt(this.pageInfo.per_p, 10)
    };
  }

  constructor() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    setTimeout(() => {
      this.dataSource.sort = this.sorter;
    }, 50);
  }

  onSort(sort: MatSort) {
    const page = this.pageInfo;
    page.o_column = sort.direction ? sort.active : 'created_at';
    page.o_direction = sort.direction ? sort.direction : 'desc';
    this.change.emit(page);
  }

  onPage(event) {
    const page = this.pageInfo;
    page.p = (event.pageIndex + 1).toString();
    this.change.emit(page);
  }

}
