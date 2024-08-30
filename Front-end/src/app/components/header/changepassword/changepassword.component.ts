import { Component, inject } from '@angular/core';
import { ChangepasswordmodalService } from '../../../services/changepasswordmodal/changepasswordmodal.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule, NzModalModule, ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  changepasswordmodalService = inject(ChangepasswordmodalService);
  authservice = inject(AuthService);
  userService = inject(UserService);
  changepasswordForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder) {
    this.user = this.authservice.getCurrentUser();
    this.changepasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  handleOk(): void {
    this.userService
      .changePassword(this.user, this.changepasswordForm.value.newPassword)
      .subscribe((res) => {
        this.changepasswordmodalService.closeModal();
      });
  }

  handleCancel(): void {
    this.changepasswordmodalService.closeModal();
  }
}
