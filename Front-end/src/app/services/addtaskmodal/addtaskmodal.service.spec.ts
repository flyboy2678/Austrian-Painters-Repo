import { TestBed } from '@angular/core/testing';

import { AddtaskmodalService } from './addtaskmodal.service';

describe('AddtaskmodalService', () => {
  let service: AddtaskmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtaskmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
