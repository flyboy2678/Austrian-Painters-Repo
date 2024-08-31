import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
  <ngx-charts-bar-vertical
    [scheme]="'vivid'"
    [animations]="false"
    [view]="view"
    [results]="data"
    [gradient]="gradient"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [xAxisLabel]="xAxisLabel"
    [yAxisLabel]="yAxisLabel"
    [title]="title"]
  >
  </ngx-charts-bar-vertical>
  `
  
})
export class TestComponent{
  data = [
    {
      "name": "Finn",
      "value": 200
    },
    {
      "name": "Peppa Pig",
      "value": 1000
    },
    {
      "name": "Gumball",
      "value": 155
    }
  ];
  

  view: any = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
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
