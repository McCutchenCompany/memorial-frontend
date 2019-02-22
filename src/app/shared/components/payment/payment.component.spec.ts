import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockMatDialogRef } from '@shared/testing/mockDialogRef';
import { TestStore } from '@shared/testing/test-store';
import { Discount } from '@store/models/app-state.model';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';

import { OrderDetailsComponent } from '../order-details/order-details.component';
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentComponent,
        OrderDetailsComponent
      ],
      imports: [
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        },
        {
          provide: MatDialogRef,
          useClass: MockMatDialogRef
        }
      ]
    });
  });

  beforeEach(() => {
    (<any>window).Stripe = {
      setPublishableKey(key) {
        return;
      }
    };
    (<any>window).gtag = () => {};
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    component.discount$ = of({code: '123'} as Discount);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
