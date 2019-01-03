import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialResultCardComponent } from './memorial-result-card.component';

describe('MemorialResultCardComponent', () => {
  let component: MemorialResultCardComponent;
  let fixture: ComponentFixture<MemorialResultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialResultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
