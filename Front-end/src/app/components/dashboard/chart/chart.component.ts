import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterComponent } from "./filter/filter.component";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule, FilterComponent],
  templateUrl: './chart.component.html',
})

export class CharComponent{


  data =[{
    "name": "Current User Stats",
    "series": [
      {
        "value": 8,
        "name": "Date 1"
      },
      {
        "value": 4,
        "name": "Date 2"
      },
      {
        "value": 7,
        "name": "Date 3"
      },
      {
        "value": 6,
        "name": "Date 4"
      },
      {
        "value": 2,
        "name": "Date 5"
      }
    ]
  }];
  

  // view: any = [550, 350];

  // options
  showGridLines = true;
  colorScheme = "nightLights";
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Participants';
  showYAxisLabel = true;
  yAxisLabel = 'Aura Level';
  title = 'Aura'

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {
    Object.assign(this.data)
  }
}
