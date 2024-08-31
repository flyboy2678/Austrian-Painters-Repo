import { Component, inject } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddtaskmodalService } from '../../../services/addtaskmodal/addtaskmodal.service';
import { UserService } from '../../../services/user/user.service';
import { TasksService } from '../../../services/tasks/tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule, NzSelectModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddTaskComponent {
  modalService = inject(AddtaskmodalService);
  tasksService = inject(TasksService);
  taskForm: FormGroup;
  userService = inject(UserService);
  users: any;

  // Add a property to control modal visibility
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
    // Fetch users
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  handleSubmit(): void {
    const firstname: string = this.users.find(
      (user: any) => user.Emp_id === this.taskForm.value.assignee
    ).FirstName;
    this.tasksService
      .createTask({ ...this.taskForm.value, firstname })
      .subscribe(() => {});
    this.taskForm.reset();
    this.modalService.closeModal();
  }

  handleCancel(): void {
    this.modalService.closeModal();
  }
}
