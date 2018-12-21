import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ViewMemorialService } from './view-memorial.service';

describe('ViewMemorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ViewMemorialService = TestBed.get(ViewMemorialService);
    expect(service).toBeTruthy();
  });
});
