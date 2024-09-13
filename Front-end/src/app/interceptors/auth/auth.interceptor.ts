import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../../services/localstorage/localstorage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();

  if (jwtToken) {
    var cloned = req.clone({
      setHeaders: { Authorization: `${jwtToken}` },
    });
    return next(cloned);
  }
  return next(req);
};

const getJwtToken = (): string | null => {
  const LocalStorage = inject(StorageService);
  let tokens: any = LocalStorage.get('JWT_TOKEN');
  if (!tokens) {
    return null;
  }
  const token = JSON.parse(tokens).token;
  return token;
};
