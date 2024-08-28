import { Component, inject, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule, NzSelectModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddTaskComponent implements OnInit {
  modalService = inject(AddtaskmodalService);
  taskForm: FormGroup;
  userService = inject(UserService);
  users: any;

  // Add a property to control modal visibility
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
    // Fetch users
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    this.modalService.closeModal();
  }

  handleCancel(): void {
    this.modalService.closeModal();
  }
}
