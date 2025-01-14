import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { EdittaskmodalService } from '../../services/edittaskmodal/edittaskmodal.service';
import { AddTaskComponent } from './addtask/addtask.component';
import { TasksService } from '../../services/tasks/tasks.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EdittaskComponent } from '../managetask/edittask/edittask.component';

@Component({
  selector: 'app-managetasks',
  standalone: true,
  imports: [
    FontAwesomeModule,
    AddTaskComponent,
    CommonModule,
    NzTableModule,
    EdittaskComponent,
  ],
  templateUrl: './managetasks.component.html',
  styleUrl: './managetasks.component.css',
})
export class ManagetasksComponent {
  tasksService = inject(TasksService);
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  editTaskModalService = inject(EdittaskmodalService);
  modalService = inject(AddtaskmodalService);
  tasks: any;
  constructor() {
    this.tasksService.getAllTasks().subscribe((data) => {
      //split date from time
      data.forEach((task: any) => {
        task.DueDate = task.DueDate.split('T')[0];
      });
      this.tasks = data;
      // console.log(this.tasks);
    });
  }

  handleAddTask(): void {
    this.modalService.showModal();
  }

  handleEditTask(task: any): void {
    this.editTaskModalService.showModal(task);
  }

  handleDeleteTask(taskId: string): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task: any) => task.Task_id !== taskId);
    });
  }
}
