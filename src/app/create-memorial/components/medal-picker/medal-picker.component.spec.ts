import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalPickerComponent } from './medal-picker.component';

describe('MedalPickerComponent', () => {
  let component: MedalPickerComponent;
  let fixture: ComponentFixture<MedalPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
