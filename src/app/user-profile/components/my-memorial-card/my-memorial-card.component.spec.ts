import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { Memorial } from './../../../shared/models/memorial.model';
import { MyMemorialCardComponent } from './my-memorial-card.component';

describe('MyMemorialCardComponent', () => {
  let component: MyMemorialCardComponent;
  let fixture: ComponentFixture<MyMemorialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMemorialCardComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMemorialCardComponent);
    component = fixture.componentInstance;
    component.memorial = {
      first_name: 'Mitch',
      middle_name: 'Jacob',
      last_name: 'McCutchen',
      birth_date: new Date(),
      death_date: new Date(),
      description: ''
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
