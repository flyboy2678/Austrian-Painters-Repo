import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterComponent } from './filter/filter.component';
import { LogHoursService } from '../../../services/logHours/log-hours.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule, FilterComponent],
  templateUrl: './chart.component.html',
})


export class CharComponent implements OnInit{
  hours = inject(LogHoursService);
  user = inject(AuthService);

  

  data : any[] = [];
  

  // view: any = [550, 350];

  // options
  showGridLines = true;
  colorScheme = 'nightLights';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Total Work Hours';
  // title = '';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {
    Object.assign(this.data);
    
  }

  ngOnInit(): void {
    // Subscribe to the dates$ observable to get live updates
    this.hours.dates.subscribe((dates: any[]) => {
      this.data = dates;
    });

    
  }
}
