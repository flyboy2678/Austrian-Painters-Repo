import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service'; // Import your user service
import { ModalService } from '../../../services/modal/modal.service';
import { NzSelectModule } from 'ng-zorro-antd/select'; // Import for dropdown
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NzModalModule, NzSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css'],
})
export class UserFormComponent implements OnInit {
  modalService = inject(ModalService);
  userService = inject(UserService); // Inject your user service
  authService = inject(AuthService);
  taskForm: FormGroup;

  isVisible: boolean = true; // Property to control modal visibility

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]], // Name field
      email: ['', [Validators.required, Validators.email]], // Email field
      role: ['', [Validators.required]], // Role field (dropdown)
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    const taskDetails = { ...this.taskForm.value };
    this.userService.updateUser(taskDetails).subscribe((res: any) => {
      this.authService.refreshToken().subscribe((res: any) => {});
      this.isVisible = false; // Close the modal after adding task
      this.modalService.closeModal(); // Or handle via service if applicable
    });
  }

  handleCancel(): void {
    this.isVisible = false; // Close the modal on cancel
    this.modalService.closeModal(); // Or handle via service if applicable
  }
}
