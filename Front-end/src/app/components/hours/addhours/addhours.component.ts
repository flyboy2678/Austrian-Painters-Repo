import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LogHoursService } from '../../../services/logHours/log-hours.service';

@Component({
  selector: 'app-addhours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addhours.component.html',
  styleUrl: './addhours.component.css',
})
export class AddhoursComponent {
  logHoursService = inject(LogHoursService);
  authService = inject(AuthService);
  form: FormGroup;
  user: any;
  constructor(private fb: FormBuilder) {
    this.user = this.authService.getCurrentUser();
    this.form = this.fb.group(
      {
        hours: ['', [Validators.required]],
        day: ['', [Validators.required]],
      },
      {
        validators: [this.isNotgreaterThanToday, this.notGreaterThan24Hours],
      }
    );
  }

  isNotgreaterThanToday(g: FormGroup) {
    const today = new Date();
    if (!g.get('day')?.value) {
      return null;
    }
    const selectedDay = new Date(g.get('day')?.value);
    return selectedDay < today ? null : { invalidDate: true };
  }

  notGreaterThan24Hours(g: FormGroup) {
    return g.get('hours')?.value <= 24 ? null : { invalidHours: true };
  }

  submit() {
    this.logHoursService
      .setDuration(this.user.id, this.form.value.day, this.form.value.hours)
      .subscribe((res) => {
        console.log(res);
      });
    this.form.reset();
  }
}
