import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getPurchasing } from '@store/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss']
})
export class CreditCardDetailsComponent implements OnInit {

  @Input() cardForm: FormGroup;
  @Input() price: number;
  @Input() error: any;

  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() purchase: EventEmitter<any> = new EventEmitter<any>();

  purchasing$: Observable<boolean>;

  monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  get yearOption() {
    let year = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 20; i++) {
      years.push(year);
      year += 1;
    }
    return years;
  }

  get disableBtn() {
    if (this.price === 0) {
      return false;
    } else if (this.cardForm.invalid) {
      return true;
    }
  }

  constructor(
    private store: Store<any>
  ) {
    this.purchasing$ = this.store.pipe(select(getPurchasing));
  }

  ngOnInit() {
  }

  onBack() {
    this.back.emit();
  }

  onSubmit() {
    this.purchase.emit(this.cardForm.value);
  }

}
