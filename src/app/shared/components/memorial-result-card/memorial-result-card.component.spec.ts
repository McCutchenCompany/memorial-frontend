import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Memorial } from '@shared/models/memorial.model';
import { configureTestSuite } from 'ng-bullet';

import { MemorialResultCardComponent } from './memorial-result-card.component';

describe('MemorialResultCardComponent', () => {
  let component: MemorialResultCardComponent;
  let fixture: ComponentFixture<MemorialResultCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialResultCardComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorialResultCardComponent);
    component = fixture.componentInstance;
    component.memorial = {
      uuid: '1234'
    } as Memorial;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
