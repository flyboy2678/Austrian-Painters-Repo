import { TestBed } from '@angular/core/testing';

import { ChangepasswordmodalService } from './changepasswordmodal.service';

describe('ChangepasswordmodalService', () => {
  let service: ChangepasswordmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepasswordmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
