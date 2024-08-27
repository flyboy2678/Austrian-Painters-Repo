import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  private localStorage = inject(StorageService);

  constructor() {}

  signup(email: string, password: string): Observable<any> {
    console.log('email: ', email, 'password: ', password);
    const user = { email, password };

    return this.http.post(
      'http://localhost:3000/api/signup',
      JSON.parse(JSON.stringify(user))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:3000/api/login', { email, password })
      .pipe(
        tap((tokens: any) => {
          this.doLoginUser(email, JSON.stringify(tokens));
        })
      );
  }

  private doLoginUser(email: string, token: string): void {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(token: string): void {
    this.localStorage.set(this.JWT_TOKEN, token);
  }

  logout(): void {
    this.localStorage.remove(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/signin']);
  }

  getCurrentUserAuthUser() {
    return this.http.get('http://localhost:3000/api/authUser');
  }

  isLoggedIn(): boolean {
    return !!this.localStorage.get(this.JWT_TOKEN);
  }
}
