import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, NzTableModule, FontAwesomeModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'], // Fixed `styleUrls` property name
})
export class TasksComponent {
  taskService = new TasksService();
  authService = new AuthService();
  user: any;
  tasks: any[] = [];
  searchQuery: string = '';
  faFileArrowDown = faFileArrowDown;

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.taskService.getUserTasks(this.user.id).subscribe((data) => {
      // Split day from time
      data.forEach((d: any) => {
        d.DueDate = d.DueDate.split('T')[0];
      });
      this.tasks = data;
    });
  }

  get filteredTasks() {
    if (!this.searchQuery) {
      return this.tasks;
    }
    return this.tasks.filter((task) =>
      task.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  setStatus(task: any, status: string) {
    task.Status = status;
    this.taskService.setProgress(task.Task_id, status).subscribe((data) => {
      // You might want to update the task list here if needed
    });
  }
}
