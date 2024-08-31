import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  taskService = new TasksService();
  authService = new AuthService();
  user: any;
  tasks: any;

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.taskService.getUserTasks(this.user.id).subscribe((data) => {
      //split day from time
      data.forEach((d: any) => {
        d.DueDate = d.DueDate.split('T')[0];
      });
      this.tasks = data;
    });
  }

  setStatus(task: any, status: string) {
    task.Status = status;
    this.taskService.setProgress(task.Task_id, status).subscribe((data) => {
      // this.taskService.getUserTasks(this.user.id).subscribe((data) => {
      //   this.tasks = data;
      // });
    });
  }
}
