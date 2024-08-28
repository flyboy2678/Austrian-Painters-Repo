import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { AddTaskComponent } from './addtask/addtask.component';

@Component({
  selector: 'app-managetasks',
  standalone: true,
  imports: [FontAwesomeModule, AddTaskComponent],
  templateUrl: './managetasks.component.html',
  styleUrl: './managetasks.component.css',
})
export class ManagetasksComponent {
  faPlus = faPlus;
  modalService = inject(AddtaskmodalService);

  handleAddTask(): void {
    console.log('Open');
    this.modalService.showModal();
  }
}
