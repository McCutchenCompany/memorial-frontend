import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockMatDialogRef } from '@shared/testing/mockDialogRef';
import { TestStore } from '@shared/testing/test-store';
import { configureTestSuite } from 'ng-bullet';

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
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
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
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
