import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  updateUser(user: any): Observable<any> {
    return this.http.put('http://localhost:3000/api/updateUser', user);
  }
}
