import { TestBed } from '@angular/core/testing';

import { EditusermodalService } from './editusermodal.service';

describe('EditusermodalService', () => {
  let service: EditusermodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditusermodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
