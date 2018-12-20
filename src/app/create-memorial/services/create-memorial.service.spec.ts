import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CreateMemorialService } from './create-memorial.service';

describe('CreateMemorialService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CreateMemorialService = TestBed.get(CreateMemorialService);
    expect(service).toBeTruthy();
  });
});
