import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MyMemorialCardComponent } from '../my-memorial-card/my-memorial-card.component';
import { MyMemorialsComponent } from './my-memorials.component';

describe('MyMemorialsComponent', () => {
  let component: MyMemorialsComponent;
  let fixture: ComponentFixture<MyMemorialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyMemorialsComponent,
        MyMemorialCardComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMemorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
