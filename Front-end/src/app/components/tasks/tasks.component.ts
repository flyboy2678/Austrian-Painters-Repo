import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
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
      this.tasks = data;
    });
  }
}
