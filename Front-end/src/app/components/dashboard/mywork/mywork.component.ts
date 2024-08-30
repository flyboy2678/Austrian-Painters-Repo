import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TasksService } from '../../../services/tasks/tasks.service';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mywork',
  standalone: true,
  imports: [CommonModule, NzTabsModule],
  templateUrl: './mywork.component.html',
  styleUrl: './mywork.component.css',
})
export class MyworkComponent {
  taskService = inject(TasksService);
  authService = inject(AuthService);
  user: any;
  tasks: any;
  dueTasks: any = [];
  overDueTasks: any = [];

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.taskService.getUserTasks(this.user.id).subscribe((data) => {
      this.tasks = data;

      //get overdue tasks
      this.tasks.forEach((task: any) => {
        if (new Date(task.DueDate) < new Date()) {
          this.overDueTasks.push(task);
        }
      });

      //get due tasks
      this.tasks.forEach((task: any) => {
        if (new Date(task.DueDate) > new Date()) {
          this.dueTasks.push(task);
        }
      });

      //Seperate date and time
      this.dueTasks.forEach((task: any) => {
        task.DueDate = task.DueDate.split('T')[0];
      });

      this.overDueTasks.forEach((task: any) => {
        task.DueDate = task.DueDate.split('T')[0];
      });
    });
  }
}
