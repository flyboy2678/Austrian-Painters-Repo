import { Component, inject } from '@angular/core';
import { LogHoursService } from '../../../services/logHours/log-hours.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-streak',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './streak.component.html',
  styleUrl: './streak.component.css'
})
export class StreakComponent {
  // icon
  faFire = faFire;


  date = inject(LogHoursService);
  auth = inject(AuthService);

  data: any[] = []; // Initialize as an empty array
  streak: number = 0; // Initialize streak counter

  constructor(){
    console.log(this.date.get365agoDate());

    const user = this.auth.getCurrentUser();
    console.log(user);
    this.date.get365DaysAgo('6', this.date.get365agoDate(), this.date.getTodayDate()).subscribe({
      next: (response) => {
        

        // maps all our data into the dates variable
        response.map((result: any, index: number) => {
          const formattedDate = this.date.makeDatePretty(result.entry_date);

          this.data[index] = formattedDate;

        });

        console.log(this.data);


        // this.hours.updateDates(this.dates);

        // console.log(this.dates);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.streak = this.calculateStreak(this.data);
        // console.log('Data fetch completed');
        console.log(this.calculateStreak(this.data));
      },
    });
  }



  calculateStreak(dates: string[]): number {
    // Normalize and sort dates
    const dateSet = new Set(dates.map(date => new Date(date).toDateString()));
    const sortedDates = Array.from(dateSet).map(date => new Date(date)).sort((a, b) => a.getTime() - b.getTime());
  
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day
  
    // Calculate streak from today
    let currentStreak = 0;
    let previousDate: Date | null = today;
  
    // Check if there is data for today
    const hasTodayData = sortedDates.some(date => date.getTime() === today.getTime());
  
    // If today is a weekday and there is no entry for today, assume streak continues from yesterday
    if (!hasTodayData && !this.isWeekend(today)) {
      previousDate = this.getPreviousWeekday(today);
    }
  
    // Iterate backwards from the most recent date in the sorted list
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const date = sortedDates[i];
  
      if (date.getTime() === previousDate.getTime()) {
        // Continue streak if the date matches
        if (!this.isWeekend(date)) {
          currentStreak += 1;
        } else {
          // Reset streak if a weekend is reached
          currentStreak = 0;
        }
  
        // Update previousDate to the previous weekday
        previousDate = this.getPreviousWeekday(date);
      } else {
        // Break the streak if there's a gap or mismatch
        break;
      }
    }
  
    return currentStreak;
  }
  
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }
  
  getPreviousWeekday(date: Date): Date {
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
  
    // Skip weekends
    while (this.isWeekend(previousDay)) {
      previousDay.setDate(previousDay.getDate() - 1);
    }
  
    return previousDay;
  }
  
}
