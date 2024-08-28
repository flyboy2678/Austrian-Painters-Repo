import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { AddTaskComponent } from './addtask/addtask.component';
import { TasksService } from '../../services/tasks/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-managetasks',
  standalone: true,
  imports: [FontAwesomeModule, AddTaskComponent, CommonModule],
  templateUrl: './managetasks.component.html',
  styleUrl: './managetasks.component.css',
})
export class ManagetasksComponent {
  tasksService = inject(TasksService);
  faPlus = faPlus;
  modalService = inject(AddtaskmodalService);
  tasks: any;
  constructor() {
    this.tasksService.getAllTasks().subscribe((data) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

  handleAddTask(): void {
    console.log('Open');
    this.modalService.showModal();
  }
}
