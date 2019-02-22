import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Memorial } from './../../../shared/models/memorial.model';
import { MemorialHeaderComponent } from './memorial-header.component';

describe('MemorialHeaderComponent', () => {
  let component: MemorialHeaderComponent;
  let fixture: ComponentFixture<MemorialHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialHeaderComponent);
    component = fixture.componentInstance;
    component.memorial = {
      image: 'testimg.jpg',
      first_name: 'first',
      last_name: 'last',
      scale: 100,
      rot: 0,
      posX: 0,
      posY: 0
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
