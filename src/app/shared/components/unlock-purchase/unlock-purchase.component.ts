import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { GoogleAnalyticsService } from '@shared/services/google-analytics.service';
import { getPurchased } from '@store/app';
import { GetStripeKey, UnlockMemorial } from '@store/app/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unlock-purchase',
  templateUrl: './unlock-purchase.component.html',
  styleUrls: ['./unlock-purchase.component.scss']
})
export class UnlockPurchaseComponent implements OnInit {

  cardForm: FormGroup;

  purchasing$: Observable<boolean>;
  error$: Observable<any>;

  get price() {
    return environment.price;
  }

  get imgFormat() {
    if (this.data.image) {
      return {
        src: `${environment.s3.url}${this.data.image}`,
        transform: this.sanitizer.bypassSecurityTrustStyle(
          `scale(${this.data.scale / 100})
          rotate(${this.data.rot}deg)
          translate(${this.data.posX.toString()}px, ${this.data.posY.toString()}px)`
        )
      };
    } else {
      return {
        src: 'assets/imgs/default-memorial.jpeg',
        transform: ''
      };
    }
  }

  get name() {
    let name = '';
    if (this.data.first_name) {
      name += `${this.data.first_name}`;
    }
    if (this.data.middle_name) {
      name += ` ${this.data.middle_name}`;
    }
    if (this.data.last_name) {
      name += ` ${this.data.last_name}`;
    }
    if (name === '') {
      name += 'New Memorial';
    }
    return name;
  }

  constructor(
    public fb: FormBuilder,
    public store: Store<any>,
    public dialogRef: MatDialogRef<UnlockPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private analytics: GoogleAnalyticsService,
    public snackbar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.analytics.sendEvent('Opened Unlock Purchase', 'Sales');
    this.buildForm();
    this.setStripeKey();
  }

  buildForm() {
    this.cardForm = this.fb.group({
      number: [null, Validators.required],
      exp_month: [null, Validators.required],
      exp_year: [null, Validators.required],
      cvc: [null, Validators.required],
      address_zip: [null, Validators.required],
      name: [null, Validators.required]
    });
  }

  setStripeKey() {
    (<any>window).Stripe.setPublishableKey(environment.stripe.publicKey);
  }

  createToken(card) {
    this.analytics.sendEvent('Complete Unlock', 'Sales', 'Conversion', this.price);
    this.store.dispatch(new GetStripeKey());
    const sub = this.store.pipe(select(getPurchased)).subscribe(res => {
      if (res) {
        this.dialogRef.close({purchased: true});
        sub.unsubscribe();
      }
    });
    (<any>window).Stripe.card.createToken(card, (status: number, response: any) => {
      if (status === 200) {
        const body = {
          token: response.id,
          memorial_id: this.data.uuid,
          price: this.price
        };
        this.store.dispatch(new UnlockMemorial(body));
      } else {
        console.log('ERROR: ', response);
      }
    });
  }

}
