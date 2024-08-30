import { TestBed } from '@angular/core/testing';

import { LogHoursService } from './log-hours.service';

describe('LogHoursService', () => {
  let service: LogHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
