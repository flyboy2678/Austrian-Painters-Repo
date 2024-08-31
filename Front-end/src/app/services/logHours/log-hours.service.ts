import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DateConverterService } from '../date_converter/date-converter.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { format } from 'date-fns';

interface DateAndHours {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class LogHoursService {
  private http = inject(HttpClient);
  dateConverter: DateConverterService | undefined;
  authService = inject(AuthService);
  date = inject(DateConverterService);

  usernameAndSurname: string = `${
    this.authService.getCurrentUser().firstName
  } ${this.authService.getCurrentUser().lastName}`;

  // to store fetched dates
  private datesSubject = new BehaviorSubject<any>([
    {
      name: this.usernameAndSurname,
      series: [
        {
          value: 0,
          name: 'Low',
        },
        {
          value: 1,
          name: 'Network',
        },
        {
          value: 2,
          name: 'Connection',
        },
   
      ],
    },
  ]);

  dates = this.datesSubject.asObservable(); // Expose observable for subscribing;

  // updates fetched dtat to dates
  updateDates(dates: any[]) {
    // dates.reverse(); // places dates from old to recent
    
    this.datesSubject.next([
      {
        name: this.authService.getCurrentUser().firstName,
        series: dates,
      },
    ]);
    
  }

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

  // formats the date into dd nameOfMonth yyyy
  makeDatePretty = (timestamp: string): string => {
    const date = new Date(timestamp);
    return format(date, 'dd MMMM, yyyy');
  };

  initTodayAnd7DaysAgoDates(user_id: string) : Observable<any>{
    return this.http.get(
      `http://localhost:3000/api/logHours/getUser/${Number(
        user_id
      )}/${this.getDate7DaysAgo()}/${this.getTodayDate()}`
    );
  }

  // clocks in a user
  getDates(user_id: string, start: string, end: string): Observable<any> {
    // debugging
    // console.log('user_id: ', user_id);
    // console.log('Entry Date 1:  ', start);
    // console.log('Entry Date 2:  ', end);

    return this.http.get(
      `http://localhost:3000/api/logHours/getUser/${Number(
        user_id
      )}/${start}/${end}`
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

  // gets todays date and formats in yyy-mm-dd
  getTodayDate(): string {
    return this.formatDate(new Date());
  }

  // gets the date 7 days ago in yyyy-mm-dd format
  getDate7DaysAgo(): string {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
    return this.formatDate(date7DaysAgo);
  }

  // formats dates in yyyy-mm-dd
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
