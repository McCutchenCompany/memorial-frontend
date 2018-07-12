import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMemorialComponent } from './find-memorial.component';

describe('FindMemorialComponent', () => {
  let component: FindMemorialComponent;
  let fixture: ComponentFixture<FindMemorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMemorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMemorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
