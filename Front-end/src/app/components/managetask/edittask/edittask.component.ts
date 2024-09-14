import { Component, inject } from '@angular/core';
import { TasksService } from '../../../services/tasks/tasks.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EdittaskmodalService } from '../../../services/edittaskmodal/edittaskmodal.service';

@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [ReactiveFormsModule, NzModalModule, NzSelectModule, CommonModule],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css',
})
export class EdittaskComponent {
  userService = inject(UserService);
  editTaskModalService = inject(EdittaskmodalService);
  taskService = inject(TasksService);
  taskForm: FormGroup;
  users: any;
  task: any;

  constructor(private fb: FormBuilder) {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
    this.task = this.editTaskModalService.getTask();
    console.log(this.task);
    this.taskForm = this.fb.group({
      taskName: [this.task?.Name, [Validators.required]],
      description: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    this.taskService.updateTask(this.taskForm.value).subscribe(() => {});
    this.taskForm.reset();
    this.editTaskModalService.closeModal();
  }

  handleCancel(): void {
    this.taskForm.reset();
    this.editTaskModalService.closeModal();
  }
}
