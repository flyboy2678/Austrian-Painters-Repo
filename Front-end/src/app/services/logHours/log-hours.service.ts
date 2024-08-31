import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DateConverterService } from '../date_converter/date-converter.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogHoursService {
  private http = inject(HttpClient);
  dateConverter: DateConverterService | undefined;
  authService = inject(AuthService);
  date = inject(DateConverterService);

  // checks if a user has clocked in
  isUserClockedIn() {
    console.log(this.date.getDate());
  }

  // clocks in a user
  clockIn(user_id: string, clock_in: Date): Observable<any> {
    // debugging
    console.log('user_id: ', user_id);
    console.log('clock_in: ', clock_in);

    const data = {
      clock_in: this.dateConverter?.angularToMysql(clock_in),
    };

    return this.http.put(
      `http://localhost:3000/api/logHours/clockIn/${Number(user_id)}`,
      data
    );
  }

  setDuration(user_id: string, day: string, duration: number): Observable<any> {
    const data = {
      id: user_id,
      duration: duration,
      day: day,
    };

    return this.http.post(
      `http://localhost:3000/api/logHours/setDuration`,
      data
    );
  }

  getHours(user_id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/logHours/getHours/${user_id}`
    );
  }

  updateHours(id: number, hours: number): Observable<any> {
    const data = {
      id: id,
      hours: hours,
    };

    return this.http.put(
      `http://localhost:3000/api/logHours/updateHours`,
      data
    );
  }
}
