import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FontAwesomeModule, NzModalModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  // icons
  faFilter = faCalendarAlt;

  // start and end date
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = new Date().toISOString().split('T')[0];

  constructor() {
    console.log(this.startDate);
    console.log(this.endDate);
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
