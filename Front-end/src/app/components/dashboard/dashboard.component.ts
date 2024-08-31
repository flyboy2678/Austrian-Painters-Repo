import { Component } from '@angular/core';
import { MyworkComponent } from './mywork/mywork.component';
import { CharComponent } from "./chart/chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MyworkComponent, CharComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
