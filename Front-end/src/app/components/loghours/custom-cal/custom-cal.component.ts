import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-custom-cal',
  standalone: true,
  imports: [FormsModule, CalendarModule, NzButtonModule],
  templateUrl: './custom-cal.component.html',
  styleUrl: './custom-cal.component.css'
})
export class CustomCalComponent {
  // our 'props' 
  @Input() data: string | undefined;
  @Input() disabled: boolean = false;
  @Input() click = new EventEmitter<void>();

  // if the button is not disabled, then run function
  onClick() {
    if (!this.disabled) {
      this.click.emit();
    }
  }
  
  // gets the current date and time
  datetime24h: Date | undefined;

  // sets the current data and time
  constructor() {
    this.setCurrentDateTime();
  }
  

  setCurrentDateTime(): void {
    this.datetime24h = new Date(); // set to current date and time
  }

  onDateSelect(): void {
    this.setCurrentDateTime(); // lock the time to the current time
  }
}
