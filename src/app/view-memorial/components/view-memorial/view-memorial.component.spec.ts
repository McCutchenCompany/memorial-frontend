import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemorialComponent } from './view-memorial.component';

describe('ViewMemorialComponent', () => {
  let component: ViewMemorialComponent;
  let fixture: ComponentFixture<ViewMemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
