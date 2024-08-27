import { Component } from '@angular/core';
import { MyworkComponent } from './mywork/mywork.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MyworkComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
