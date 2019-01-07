import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { PurchaseLicense } from '@store/user-profile/user-profile.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cardForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public store: Store<any>,
    public dialogRef: MatDialogRef<PaymentComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.setStripeKey();
  }

  buildForm() {
    this.cardForm = this.fb.group({
      number: [null, Validators.required],
      exp_month: [null, Validators.required],
      exp_year: [null, Validators.required],
      cvc: [null, Validators.required]
    });
  }

  setStripeKey() {
    (<any>window).Stripe.setPublishableKey(environment.stripe.publicKey);
  }

  createToken(card) {
    (<any>window).Stripe.card.createToken(card, (status: number, response: any) => {
      if (status === 200) {
        console.log('SUCCESS: ', response);
        const body = {
          token: response.id,
          quantity: 1
        };
        this.store.dispatch(new PurchaseLicense(body));
        this.dialogRef.close();
      } else {
        console.log('ERROR: ', response);
      }
    });
  }

}
