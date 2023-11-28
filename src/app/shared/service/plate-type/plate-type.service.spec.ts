import { TestBed } from '@angular/core/testing';

import { PlateTypeService } from './plate-type.service';

describe('PlateTypeService', () => {
  let service: PlateTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
