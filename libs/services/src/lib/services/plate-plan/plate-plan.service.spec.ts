import { TestBed } from '@angular/core/testing';

import { PlatePlanService } from './plate-plan.service';

describe('PlatePlanService', () => {
  let service: PlatePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
