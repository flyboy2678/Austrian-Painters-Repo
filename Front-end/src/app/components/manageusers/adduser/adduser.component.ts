import { Component, inject } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { AddusermodalService } from '../../../services/addusermodal/addusermodal.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [NzModalModule, NzSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent {
  userService = inject(UserService);
  addUserModalService = inject(AddusermodalService);
  addUserForm: FormGroup;
  admin: number = 1;
  employee: number = 0;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  handleSubmit(): void {
    this.userService.createUser(this.addUserForm.value).subscribe(() => {});
    this.addUserModalService.closeModal();
    this.addUserForm.reset();
  }

  handleCancel(): void {
    this.addUserModalService.closeModal();
    this.addUserForm.reset();
  }
}
