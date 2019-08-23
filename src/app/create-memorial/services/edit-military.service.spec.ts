import { TestBed } from '@angular/core/testing';

import { EditMilitaryService } from './edit-military.service';

describe('EditMilitaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditMilitaryService = TestBed.get(EditMilitaryService);
    expect(service).toBeTruthy();
  });
});
