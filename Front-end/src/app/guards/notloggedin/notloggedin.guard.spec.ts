import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notloggedinGuard } from './notloggedin.guard';

describe('notloggedinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notloggedinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
