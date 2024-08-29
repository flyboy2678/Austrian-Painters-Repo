import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConverterService {
  // gets the current date and time in dd-mm-yyyy hh:mm:ss
  getDate() {
    const currentDate = new Date(); // current date

    // Extract day, month, and year
    const day = String(currentDate.getDate()).padStart(2, '0'); // dd
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // mm
    const year = String(currentDate.getFullYear()).slice(-2); // yy

    // Extract hours, minutes, and seconds
    const hours = String(currentDate.getHours()).padStart(2, '0'); // hh
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // mm
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // ss

    // Combine into desired format
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  // changes and returns type of date data from string to object
  convertStringDateToDateObject(value: string) {
    // Split the date and time parts
    const [datePart, timePart] = value.split(' ');

    // Extract day, month, year
    const [day, month, year] = datePart.split('-').map(Number);

    // Extract hours, minutes, seconds
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Create a Date object
    const formattedYear = 2000 + year; // Assuming the year is in the format 'yy'

    return new Date(formattedYear, month - 1, day, hours, minutes, seconds);
  }

  // converts given mysql date to an angular date object
  mysqlToAngular(date: string): Date {
    return new Date(date.replace(' ', 'Z'));
  }

  // converts given angular date object to mysql string
  angularToMysql(date: Date) {
    return date.toISOString().slice(0, 19).replace('Z', ' ');
  }
}
