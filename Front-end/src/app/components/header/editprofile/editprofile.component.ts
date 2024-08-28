import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../services/modal/modal.service';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent implements OnInit {
  modalService = inject(ModalService);
  userService = inject(UserService);
  authService = inject(AuthService);
  profileForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.user = this.authService.getCurrentUser();
    console.log('User: ', this.user);
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    const details = { ...this.profileForm.value, id: this.user.id };
    this.userService.updateUser(details).subscribe((res: any) => {});
    this.modalService.closeModal();
    this.authService.refreshToken().subscribe((res: any) => {});
  }

  handleCancel(): void {
    this.modalService.closeModal();
  }
}
