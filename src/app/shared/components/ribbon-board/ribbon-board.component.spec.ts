import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonBoardComponent } from './ribbon-board.component';

describe('RibbonBoardComponent', () => {
  let component: RibbonBoardComponent;
  let fixture: ComponentFixture<RibbonBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RibbonBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
