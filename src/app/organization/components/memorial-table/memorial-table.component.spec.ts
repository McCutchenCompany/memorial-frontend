import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialTableComponent } from './memorial-table.component';

describe('MemorialTableComponent', () => {
  let component: MemorialTableComponent;
  let fixture: ComponentFixture<MemorialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
