import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankPickerComponent } from './rank-picker.component';

describe('RankPickerComponent', () => {
  let component: RankPickerComponent;
  let fixture: ComponentFixture<RankPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
