import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMemorialCardComponent } from './my-memorial-card.component';

describe('MyMemorialCardComponent', () => {
  let component: MyMemorialCardComponent;
  let fixture: ComponentFixture<MyMemorialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMemorialCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMemorialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
