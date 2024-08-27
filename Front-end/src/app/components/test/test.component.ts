import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ImportsModule } from './imports';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ImportsModule],
  template: `
    <div class="flex flex-col items-start ">
      <label for="calendar-24h" class="font-bold block mb-2">24h Format</label>
      <p-calendar 
          inputId="calendar-24h"
          [inline]="true" 
          [(ngModel)]="datetime24h" 
          [showTime]="true" 
          [disabled]="true" 
          dateFormat="dd/mm/yy"
          timeFormat="HH:mm:ss"
          class="mb-4"
      ></p-calendar>
      <button 
          type="button" 
          (click)="confirmDate()" 
          class="p-button p-component p-button-primary"
      >
        Open
      </button>
      <button 
          type="button" 
          (click)="confirmDate()" 
          class="p-button p-component p-button-primary"
      >
        Confirm
      </button>
    </div>
  `
})
export class TestComponent implements OnInit {
  datetime24h: Date | undefined;

  ngOnInit() {
    // Initialize datetime24h with the current date and time
    this.datetime24h = new Date();
  }

  // Function to handle confirm button click
  confirmDate() {
    if (this.datetime24h) {
      console.log('Selected date:', this.datetime24h);

      alert(`Selected date: ${this.datetime24h}`);
    } else {
      console.log('No date selected.');
      alert('No date selected.');
    }
  }
}
