import { TestBed } from '@angular/core/testing';

import { EdittaskmodalService } from './edittaskmodal.service';

describe('EdittaskmodalService', () => {
  let service: EdittaskmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdittaskmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
