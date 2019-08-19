import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialShareComponent } from './memorial-share.component';

describe('MemorialShareComponent', () => {
  let component: MemorialShareComponent;
  let fixture: ComponentFixture<MemorialShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
