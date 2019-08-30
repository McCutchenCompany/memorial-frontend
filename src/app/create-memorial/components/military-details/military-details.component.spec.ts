import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitaryDetailsComponent } from './military-details.component';

describe('MilitaryDetailsComponent', () => {
  let component: MilitaryDetailsComponent;
  let fixture: ComponentFixture<MilitaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilitaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilitaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
