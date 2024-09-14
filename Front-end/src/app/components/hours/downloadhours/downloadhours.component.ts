import { Component, inject, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LogHoursService } from '../../../services/logHours/log-hours.service';
import { AuthService } from '../../../services/auth/auth.service';
import { saveAs } from 'file-saver';


interface DateAndHours {
  name: string;
  value: number;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FontAwesomeModule, NzModalModule, ReactiveFormsModule],
  templateUrl: './downloadhours.component.html',
  styleUrl: './downloadhours.component.css',
})
export class FilterComponent implements OnInit {
  // icons
  faFilter = faCalendarAlt;

  hours = inject(LogHoursService);

  authService = inject(AuthService);

  dates: DateAndHours[] = []; // will return a series of data

  dateForm: FormGroup;

  isVisible = false; // show and hide modal
  isOkLoading = false; // load on click or not

  // initialize with today's date
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];

  constructor() {
    // sets the form group to current dates
    this.dateForm = new FormGroup({
      startDay: new FormControl(this.startDate),
      endDay: new FormControl(this.endDate),
    });
  }

  ngOnInit(): void {
    // Retrieve the user ID from the auth service
    const userId = this.authService.getCurrentUser().id;

    // Fetch the data using the getDates method
    this.hours.initTodayAnd7DaysAgoDates(userId).subscribe({
      next: (response) => {
        // console.log('Data fetched successfully:', response);

        // maps all our data into the dates variable
        response.map((result: any, index: number) => {
          const formattedDate = this.hours.makeDatePretty(result.entry_date);

          this.dates[index] = {
            name: formattedDate,
            value: result.hours,
          };
        });

        this.hours.updateDates(this.dates);
        // console.log(this.dates);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        // console.log('Data fetch completed');
      },
    });
  }

  // Function to convert JSON to CSV format
  convertToCSV(data: DateAndHours[]): string {
    const headers = 'Date,Hours\n';
    const rows = data.map((row) => `${row.name},${row.value}`).join('\n');
    return headers + rows;
  }

  // Function to trigger download of CSV file
  downloadCSV(): void {
    const csvData = this.convertToCSV(this.dates);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'your_data.csv'); // Download the CSV file
  }

  onSubmit(): void {
    const startDate = this.dateForm.get('startDay')?.value;
    const endDate = this.dateForm.get('endDay')?.value;

    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);

    if (startDate && endDate) {
      const userId = this.authService.getCurrentUser().id;

      this.hours.getDates(userId, startDate, endDate).subscribe({
        next: (response) => {
          console.log('Data fetched successfully:', response);

          // maps all our data into the dates variable
          response.map((result: any, index: number) => {
            const formattedDate = this.hours.makeDatePretty(result.entry_date);
            this.dates[index] = {
              name: formattedDate,
              value: result.hours,
            };
          });

          this.hours.updateDates(this.dates);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          console.log('Data fetch completed');
        },
      });
    } else {
      console.error('Please select both start and end dates.');
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleConfirm(): void {
    this.onSubmit();
    this.isOkLoading = true;
    this.isVisible = false;
    this.isOkLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
