import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TasksService } from '../../../services/tasks/tasks.service';

@Component({
  selector: 'app-mywork',
  standalone: true,
  imports: [],
  templateUrl: './mywork.component.html',
  styleUrl: './mywork.component.css',
})
export class MyworkComponent {
  taskService = inject(TasksService);
  authService = inject(AuthService);
  user: any;
  tasks: any;

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.taskService.getUserTasks(this.user.id).subscribe((data) => {
      this.tasks = data;
    });
  }
}
