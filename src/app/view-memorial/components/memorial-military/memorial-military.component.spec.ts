import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialMilitaryComponent } from './memorial-military.component';

describe('MemorialMilitaryComponent', () => {
  let component: MemorialMilitaryComponent;
  let fixture: ComponentFixture<MemorialMilitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialMilitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialMilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
