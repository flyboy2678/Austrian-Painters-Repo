import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  createUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/createUser', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put('http://localhost:3000/api/updateUser', user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getAllUsers');
  }

  deleteUser(user: any): Observable<any> {
    return this.http.delete(
      `http://localhost:3000/api/deleteUser/${user.Emp_id}`
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/getUserById/${id}`);
  }

  adminUpdateUser(userid: string, user: any): Observable<any> {
    user.id = userid;
    console.log(user);
    return this.http.put('http://localhost:3000/api/adminUpdateUser', user);
  }

  changePassword(userObj: any, passwords: any): Observable<any> {
    const user = {
      id: userObj.id,
      oldPassword: userObj.password,
      newPassword: passwords,
    };

    return this.http.put('http://localhost:3000/api/changePassword', user);
  }
}
