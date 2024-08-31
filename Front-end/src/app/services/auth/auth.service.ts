import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { StorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private loggedUser: string = '';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  private localStorage = inject(StorageService);

  constructor() {}

  signup(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Observable<any> {
    console.log('email: ', email, 'password: ', password);
    const user = { name, surname, email, password };
    return this.http.post('http://localhost:3000/api/signup', user);
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

  getCurrentUser(): any {
    const token: string | null = this.localStorage.get(this.JWT_TOKEN);
    if (token) {
      try {
        return jwtDecode(token);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  isTokenExpired() {
    const token: string | null = this.localStorage.get(this.JWT_TOKEN);
    if (!token) return true;
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken(): Observable<any> {
    const refreshToken = JSON.parse(
      this.localStorage.get(this.JWT_TOKEN) as string
    );
    return this.http
      .post('http://localhost:3000/api/refreshToken', { refreshToken })
      .pipe(
        tap((tokens: any) => {
          this.storeJwtToken(JSON.stringify(tokens));
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.localStorage.get(this.JWT_TOKEN);
  }
}
