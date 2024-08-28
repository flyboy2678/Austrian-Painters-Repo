import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],  // Added Name field
        surname: ['', [Validators.required]],  // Added Surname field
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(event: Event) {
    if (this.signupForm.valid) {
      event.preventDefault();
      // Include name and surname in the sign-up logic if needed
      const { name, surname, email, password } = this.signupForm.value;

      this.authService
        .signup(email, password)
        .subscribe((res: any) => {
          this.router.navigate(['/signin']);
        });
    }
  }
}
