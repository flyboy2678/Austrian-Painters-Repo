import { Component, inject } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EditusermodalService } from '../../../services/editusermodal/editusermodal.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NzModalModule, NzSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css'],
})
export class EditusersComponent {
  userService = inject(UserService);
  editUserModalService = inject(EditusermodalService);
  taskForm: FormGroup;
  user: any;
  admin: number = 1;
  employee: number = 0;

  constructor(private fb: FormBuilder) {
    this.user = this.editUserModalService.getUser();
    this.taskForm = this.fb.group({
      name: [this.user.FirstName, [Validators.required]],
      surname: [this.user.LastName, [Validators.required]],
      email: [this.user.Email, [Validators.required, Validators.email]],
      role: [this.user.Admin, [Validators.required]],
    });
  }

  handleSubmit(): void {
    this.userService
      .adminUpdateUser(this.user.Emp_id, this.taskForm.value)
      .subscribe(() => {
        this.editUserModalService.closeModal();
      });
    this.taskForm.reset();
  }

  handleCancel(): void {
    this.editUserModalService.closeModal();
    this.taskForm.reset();
  }
}
