import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CustomCalComponent } from "./custom-cal/custom-cal.component";
import { TimeWorkedService } from '../../services/time_worked/time-worked.service';

@Component({
  selector: 'app-loghours',
  standalone: true,
  imports: [FormsModule, CalendarModule, CustomCalComponent],
  templateUrl: './loghours.component.html',
  styleUrl: './loghours.component.css'
})
export class LoghoursComponent {

  constructor(public timeCounterService: TimeWorkedService) {
    this.timeCounterService.clockIn();  // call the service method to clock in
  }

  disableClockIn: boolean = false;
  disableClockOut: boolean = true;
  
  

  date = new Date
  // our clockIn method will be called when the users clocks in
  clockIn() {
    // console.log(this.date);
    this.disableClockIn = !this.disableClockIn;
    this.disableClockOut = !this.disableClockOut;

    // console.log("Clock In");
  }

  // our clockIn method will be called when the users clocks in
  clockOut(){
    this.disableClockOut = true;

    // console.log("Clocked in");
  }
}
