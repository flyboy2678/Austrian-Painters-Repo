import { Component } from '@angular/core';
import { AddhoursComponent } from './addhours/addhours.component';
import { EdithoursComponent } from './edithours/edithours.component';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [AddhoursComponent, EdithoursComponent],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css',
})
export class HoursComponent {}
