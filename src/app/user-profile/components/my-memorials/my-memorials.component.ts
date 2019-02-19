import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { Memorial } from '@shared/models/memorial.model';
import { User } from '@shared/models/user.model';

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
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onAddMemorial() {
    this.dialog.open(PaymentComponent, {
      closeOnNavigation: true
    });
  }

}
