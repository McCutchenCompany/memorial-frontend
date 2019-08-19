import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  CreateMemorialOptionsComponent,
} from '@shared/components/create-memorial-options/create-memorial-options.component';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { Memorial } from '@shared/models/memorial.model';
import { User } from '@shared/models/user.model';
import { CreateFreeMemorial } from '@store/app';

@Component({
  selector: 'app-my-memorials',
  templateUrl: './my-memorials.component.html',
  styleUrls: ['./my-memorials.component.scss']
})
export class MyMemorialsComponent implements OnInit {

  @Input() memorials: Memorial[];
  @Input() user: User;
  @Output() addLicense: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialog: MatDialog,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  onAddMemorial() {
    this.dialog.open(CreateMemorialOptionsComponent, {
      maxWidth: '38.75rem',
      width: '100vw',
      autoFocus: false
    }).afterClosed().subscribe(res => {
      if (res) {
        res.free ? this.store.dispatch(new CreateFreeMemorial()) : this.dialog.open(PaymentComponent, {
          closeOnNavigation: true
        });
      }
    });
  }

}
