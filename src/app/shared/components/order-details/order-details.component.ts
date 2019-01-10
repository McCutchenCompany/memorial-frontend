import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Discount } from '@store/models/app-state.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnChanges {

  @Input() discount: Discount;
  @Input() quantityForm: FormGroup;

  unitPrice = 60;

  get total() {
    if (!this.discount || !this.discount.percent) {
      return this.unitPrice * this.quantityForm.value.quantity;
    } else {
      const discounted = this.unitPrice - (this.unitPrice * (this.discount.percent / 100));
      const notDiscounted = (this.quantityForm.value.quantity - 1) * this.unitPrice;
      return discounted + notDiscounted;
    }
  }

  get displayQuantity() {
    if (!this.discount || !this.discount.percent) {
      return this.quantityForm.value.quantity;
    } else {
      return this.quantityForm.value.quantity - 1;
    }
  }

  get quantityTotal() {
    if (!this.discount || !this.discount.percent) {
      return this.unitPrice * this.quantityForm.value.quantity;
    } else {
      return this.unitPrice * (this.quantityForm.value.quantity - 1);
    }
  }

  get displayPercent() {
    return Math.floor(this.discount.percent);
  }

  constructor() { }

  ngOnChanges() {
    console.log('changes');
    this.setPrice();
  }

  setPrice() {
    console.log('set price');
    this.quantityForm.controls['price'].setValue(this.total);
  }

}
