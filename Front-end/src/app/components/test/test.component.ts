import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ImportsModule } from './imports';
import { LogHoursService } from '../../services/logHours/log-hours.service';
import { DateConverterService } from '../../services/date_converter/date-converter.service';
import e from 'express';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  template: `
  <button
  (click)="clockInUser()"
  >Click Me</button>
  `
  
})
export class TestComponent{
  date = inject(DateConverterService);

  constructor(private logHoursService: LogHoursService) {
    const previousDate = '29-05-25 19:25:37';
    const currentDate = this.date.getDate();

    // checks if date object for current is smaller or bigger than this
    if( this.date.convertStringDateToDateObject(currentDate)  < this.date.convertStringDateToDateObject(previousDate) ){
      console.log("Smaller")
    } else{
      console.log("Greater")
    }
    console.log(previousDate);
    console.log(this.date.getDate());
  }


  // clocks in a user if the button is clicked
  clockInUser() {
    const userId = '6'; // example user_id
    const clockInTime = new Date(); // example clock-in time

    this.logHoursService.clockIn(userId, clockInTime).subscribe({
      next: (response) => {
        console.log('Clock-in successful:', response);
      },
      error: (error) => {
        console.error('Clock-in error:', error);
      }
    });
}
}
