import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeWorkedService {

  startTime: Date = new Date('2024-08-29T00:00:00'); // Example start time
  elapsedMinutes = signal(0);
  elapsedHours = signal(0);

  // starts updating time per 60000 millisecond 
  constructor() {
    this.updateElapsedTime();
    setInterval(() => {
      this.updateElapsedTime();
    }, 60000); // Update every minute
  }

  // sets to current time
  clockIn() {
    this.startTime = new Date();
    this.updateElapsedTime();
  }

  // calculates the total minutes and hours
  private updateElapsedTime() {
    const now = new Date(); // gets the date time now
    const diff = now.getTime() - this.startTime.getTime(); // difference in milliseconds

    const totalMinutes = Math.floor(diff / 1000 / 60); // convert milliseconds to minutes
    const hours = Math.floor(totalMinutes / 60); // difference in hours
    const minutes = totalMinutes % 60; // difference in minutes

    // sets our signalled variables to update each time in the ui
    this.elapsedHours.set(hours); 
    this.elapsedMinutes.set(minutes);
  }
}
