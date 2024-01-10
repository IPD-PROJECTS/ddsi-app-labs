import { TestBed } from '@angular/core/testing';

import { PlateStatsService } from './plate-stats.service';

describe('PlateStatesService', () => {
  let service: PlateStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
