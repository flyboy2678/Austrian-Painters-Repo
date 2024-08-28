import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ModalService } from '../../../services/modal/modal.service';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddTaskComponent implements OnInit {
  modalService = inject(ModalService);
  userService = inject(UserService);
  authService = inject(AuthService);
  taskForm: FormGroup;
  
  // Add a property to control modal visibility
  isVisible: boolean = true; // Set initial visibility as needed

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
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
