import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'], // Corrected from styleUrl to styleUrls
})
export class SigninComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(event: Event) {
    if (this.loginForm.valid) {
      event.preventDefault();
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        });
      console.log('Login form submitted', this.loginForm.value);
    }
  }
}
