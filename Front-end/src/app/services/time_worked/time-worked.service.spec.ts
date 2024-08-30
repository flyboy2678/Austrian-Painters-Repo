import { TestBed } from '@angular/core/testing';

import { TimeWorkedService } from './time-worked.service';

describe('TimeWorkedService', () => {
  let service: TimeWorkedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeWorkedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
