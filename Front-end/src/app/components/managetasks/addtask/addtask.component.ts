import { Component, inject } from '@angular/core';
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
import { TasksService } from '../../../services/tasks/tasks.service';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../../../firebase/config';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule, NzSelectModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddTaskComponent {
  modalService = inject(AddtaskmodalService);
  tasksService = inject(TasksService);
  taskForm: FormGroup;
  userService = inject(UserService);
  users: any;
  selectedFile: File | null = null;
  //create a child reference
  documentRef = ref(storage, 'documents'); // documentRef now points to 'documents'

  // Add a property to control modal visibility
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
    // Fetch users
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // console.log('File selected:', file);
    }
  }

  async handleSubmit(): Promise<void> {
    let downloadURL;

    try {
      if (this.selectedFile) {
        const documentRef = ref(storage, `documents/${this.selectedFile.name}`);
        //Upload the file to firebase storage
        const snapshot = await uploadBytes(documentRef, this.selectedFile);
        // console.log('File uploaded successfully');

        //Get the download URL
        downloadURL = await getDownloadURL(snapshot.ref);
      } else {
        // console.log('No file selected for upload');
      }
    } catch (error) {
      // console.error('Error uploading file:', error);
    }

    const firstname: string = this.users.find(
      (user: any) => user.Emp_id === this.taskForm.value.assignee
    ).FirstName;
    this.tasksService
      .createTask({ ...this.taskForm.value, downloadURL, firstname })
      .subscribe(() => {});
    this.taskForm.reset();
    this.modalService.closeModal();
  }

  handleCancel(): void {
    this.modalService.closeModal();
  }
}
