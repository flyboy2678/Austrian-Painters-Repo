import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { LogHoursService } from '../../../services/logHours/log-hours.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { format } from 'date-fns';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-edithours',
  standalone: true,
  imports: [NzSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edithours.component.html',
  styleUrl: './edithours.component.css',
})
export class EdithoursComponent {
  authServ = inject(AuthService);
  logHoursService = inject(LogHoursService);
  user: any;
  days: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        hours: ['', [Validators.required]],
        day: ['', [Validators.required]],
      },
      { validator: this.notGreaterThan24Hours }
    );
    this.user = this.authServ.getCurrentUser();
    this.logHoursService.getHours(this.user.id).subscribe((res) => {
      //sort according to date in descending order
      res.sort((a: any, b: any) => {
        return (
          new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
        );
      });
      //convert date t0 dd/mmmm/yyyy
      res.forEach((element: any) => {
        element.date = format(new Date(element.entry_date), 'dd MMMM yyyy');
      });
      this.days = res;
    });
  }

  submit() {
    this.logHoursService
      .updateHours(this.form.value.day, this.form.value.hours)
      .subscribe((res) => {
        console.log(res);
      });
    this.form.reset();
  }

  onChange(event: Event): void {
    const day = this.days?.find((day: any) => day.id === event);
    console.log(day?.hours);
    this.form.get('hours')?.setValue(day?.hours);
  }

  notGreaterThan24Hours(g: FormGroup) {
    if (!g.get('hours')?.value) {
      return null;
    }
    return g.get('hours')?.value <= 24 ? null : { invalidHours: true };
  }
}
