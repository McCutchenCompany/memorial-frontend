import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockPurchaseComponent } from './unlock-purchase.component';

describe('UnlockPurchaseComponent', () => {
  let component: UnlockPurchaseComponent;
  let fixture: ComponentFixture<UnlockPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
