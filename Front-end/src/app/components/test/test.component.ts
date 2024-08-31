import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { format } from 'date-fns';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
    <h1>Hi</h1>
  `,
})
export class TestComponent {
  

  data = [
    {
      name: 'Finn',
      value: 200,
    },
    {
      name: 'Peppa Pig',
      value: 1000,
    },
    {
      name: 'Gumball',
      value: 155,
    },
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
  title = 'Aura';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  makeDatePretty = (timestamp: string): string => {
    const date = new Date(timestamp);
    return format(date, 'dd MMMM yyyy');
  };

  constructor() {
    Object.assign(this.data);
    console.log(this.makeDatePretty("2024-08-31T20:58:37.000Z"));
  }
}
