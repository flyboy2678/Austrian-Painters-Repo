import { TestBed } from '@angular/core/testing';

import { AddusermodalService } from './addusermodal.service';

describe('AddusermodalService', () => {
  let service: AddusermodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddusermodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
