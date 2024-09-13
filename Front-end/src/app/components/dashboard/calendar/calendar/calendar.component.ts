import { Component } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  currentDate: Date = new Date();
  currentMonth: string = format(this.currentDate, 'MMMM yyyy');
  calendar: Date[] = [];
  firstDayOfCurrentMonth: number = getDay(startOfMonth(this.currentDate));
  lastDayOfCurrentMonth: number = getDay(endOfMonth(this.currentDate));
  prevEmptyDaysCount: number =
    this.firstDayOfCurrentMonth === 0 ? 0 : this.firstDayOfCurrentMonth;
  prevEmptyDays: number[] = Array(this.prevEmptyDaysCount);
  prevMonthDays: Date[] = this.getLastDaysOfPrevMonth();
  nextEmptyDaysCount: number = 6 - this.lastDayOfCurrentMonth;
  nextEmptyDays: number[] = Array(this.nextEmptyDaysCount);
  nextMonthDays: Date[] = this.getFirstDayOfNextMonth();

  constructor() {
    this.calendar = this.generateCalendar();
  }

  generateCalendar(): Date[] {
    const start = startOfMonth(this.currentDate);
    const end = endOfMonth(this.currentDate);
    return eachDayOfInterval({ start, end });
  }

  format(date: Date): string {
    return format(date, 'd');
  }

  nextMonth(): void {
    this.currentDate = addMonths(this.currentDate, 1);
    this.updateDate(this.currentDate);
  }

  prevMonth(): void {
    this.currentDate = subMonths(this.currentDate, 1);
    this.updateDate(this.currentDate);
  }

  updateDate(date: Date): void {
    this.firstDayOfCurrentMonth = getDay(startOfMonth(date));
    this.prevEmptyDaysCount =
      this.firstDayOfCurrentMonth === 0 ? 0 : this.firstDayOfCurrentMonth;
    this.prevEmptyDays = Array(this.prevEmptyDaysCount);
    this.lastDayOfCurrentMonth = getDay(endOfMonth(date));
    this.nextEmptyDaysCount = 6 - this.lastDayOfCurrentMonth;
    this.nextEmptyDays = Array(this.nextEmptyDaysCount);
    this.prevMonthDays = this.getLastDaysOfPrevMonth();
    this.nextMonthDays = this.getFirstDayOfNextMonth();
    this.currentMonth = format(date, 'MMMM yyyy');
    this.calendar = this.generateCalendar();
  }

  getLastDaysOfPrevMonth(): Date[] {
    if (this.prevEmptyDaysCount === 0) {
      return [];
    }
    const prevMonth = subMonths(this.currentDate, 1);
    const start = startOfMonth(prevMonth);
    const end = endOfMonth(prevMonth);
    const lastDays = eachDayOfInterval({ start, end });
    return lastDays.slice(-this.prevEmptyDaysCount);
  }

  getFirstDayOfNextMonth(): Date[] {
    if (this.nextEmptyDaysCount === 0) {
      return [];
    }
    const nextMonth = addMonths(this.currentDate, 1);
    const start = startOfMonth(nextMonth);
    const end = endOfMonth(nextMonth);
    const firstDays = eachDayOfInterval({ start, end });
    return firstDays.slice(0, this.nextEmptyDaysCount);
  }
  isToday(date: Date): boolean {
    return format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  }
}
