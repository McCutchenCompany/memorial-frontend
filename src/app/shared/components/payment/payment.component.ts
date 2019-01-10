import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { getDiscountError, PurchaseLicense } from '@store/app';
import { CheckDiscount } from '@store/app/app.actions';
import { getAppError, getDiscount, getPurchased } from '@store/app/app.reducer';
import { Discount } from '@store/models/app-state.model';
import { Observable } from 'rxjs';

import { getPurchasing } from './../../../store/app/app.reducer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cardForm: FormGroup;
  discountForm: FormGroup;
  quantityForm: FormGroup;

  discountError$: Observable<any>;
  discount$: Observable<Discount>;
  purchasing$: Observable<boolean>;
  error$: Observable<any>;

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

  constructor(
    public fb: FormBuilder,
    public store: Store<any>,
    public dialogRef: MatDialogRef<PaymentComponent>
  ) {
    this.discountError$ = this.store.pipe(select(getDiscountError));
    this.discount$ = this.store.pipe(select(getDiscount));
    this.purchasing$ = this.store.pipe(select(getPurchasing));
    this.error$ = this.store.pipe(select(getAppError));
  }

  ngOnInit() {
    this.buildForm();
    this.setStripeKey();
    this.discountError$.subscribe(res => {
      if (res) {
        this.discountForm.controls['code'].setErrors(res);
      }
    });
  }

  buildForm() {
    this.cardForm = this.fb.group({
      number: [null, Validators.required],
      exp_month: [null, Validators.required],
      exp_year: [null, Validators.required],
      cvc: [null, Validators.required]
    });
    this.discountForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(36)]]
    });
    this.quantityForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [60, Validators.required]
    });
  }

  checkDiscount() {
    this.store.dispatch(new CheckDiscount(this.discountForm.value.code));
  }

  setStripeKey() {
    (<any>window).Stripe.setPublishableKey(environment.stripe.publicKey);
  }

  createToken(card) {
    (<any>window).Stripe.card.createToken(card, (status: number, response: any) => {
      if (status === 200) {
        const body = {
          token: response.id,
          quantity: this.quantityForm.value.quantity,
          price: this.quantityForm.value.price
        };
        this.store.dispatch(new PurchaseLicense(body));
        const sub = this.store.pipe(select(getPurchased)).subscribe(res => {
          if (res) {
            this.dialogRef.close();
            sub.unsubscribe();
          }
        });
      } else {
        console.log('ERROR: ', response);
      }
    });
  }

}