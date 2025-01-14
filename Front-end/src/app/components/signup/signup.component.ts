import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    FontAwesomeModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signupForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]], // Added Name field
        surname: ['', [Validators.required]], // Added Surname field
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        contact: ['', Validators.required],
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
    // console.log(this.signupForm.value.gender  );
    // console.log(this.signupForm.value.dob);
    // console.log(this.signupForm.value.contact);

    if (this.signupForm.valid) {
      event.preventDefault();
      // Include name and surname in the sign-up logic if needed
      const { name, surname, email, password, gender, dob, contact } = this.signupForm.value;
      this.authService
        .signup(name, surname, email, password, gender, dob, contact)
        .subscribe((res: any) => {
          this.router.navigate(['/signin']);
        });
    }
  }
}
