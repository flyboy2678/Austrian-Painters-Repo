import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LogHoursService } from '../../services/logHours/log-hours.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css',
})
export class HoursComponent {
  logHoursService = inject(LogHoursService);
  authService = inject(AuthService);
  form: FormGroup;
  user: any;
  constructor(private fb: FormBuilder) {
    this.user = this.authService.getCurrentUser();
    this.form = this.fb.group({
      hours: ['', [Validators.required]],
      day: ['', [Validators.required]],
    });
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
