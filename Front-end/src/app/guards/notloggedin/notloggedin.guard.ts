import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const notloggedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);
  if (authService.isLoggedIn()) {
    routerService.navigate(['/dashboard']);
    return false;
  }
  return true;
};
