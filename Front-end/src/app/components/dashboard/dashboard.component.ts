import { Component } from '@angular/core';
import { MyworkComponent } from './mywork/mywork.component';
import { CharComponent } from './chart/chart.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MyworkComponent, CharComponent, CalendarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
