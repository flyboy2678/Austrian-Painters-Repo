import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalService } from '../../../services/modal/modal.service';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { storage } from '../../../../firebase/config';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [NzModalModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css',
})
export class EditprofileComponent implements OnInit {
  modalService = inject(ModalService);
  userService = inject(UserService);
  authService = inject(AuthService);
  profileForm: FormGroup;
  user: any;
  selectedFile: File | null = null;
  //create a child reference
imagesRef = ref(storage, 'images');   // imagesRef now points to 'images'

//Child references can also take paths separated by '/'
//spaceRef = ref(storage, 'images/beef.JPG'); // spaceRef now points to "images/space.jpg


  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.user = this.authService.getCurrentUser();
    console.log('User: ', this.user);
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    });
  }

  ngOnInit(): void {}

  async handleSubmit(): Promise<void> {
    this.modalService.closeModal();
    //check if the user has a profile picture
    let downloadURL;
    if(this.user.profile_picture) {
      //delete the profile picture
      const pictureRef = ref(storage, `images/${this.user.id}`);
      deleteObject(pictureRef).then(() => {
        console.log('Profile picture deleted');
      }
      ).catch((error) => {
        console.log('Error deleting profile picture: ', error);
      });
      
    } else {
      //upload the profile picture
      const pictureRef = ref(storage, `images/${this.user.id}`);
      try {
        if (this.selectedFile) {
          const snapshot = await uploadBytes(pictureRef, this.selectedFile);
          console.log('Profile picture uploaded');
          downloadURL = await getDownloadURL(snapshot.ref);
        } else {
          console.log('No file selected for upload');
        }
      } catch (error) {
        console.log('Error uploading profile picture: ', error);
      }
    }
    const details = { ...this.profileForm.value, id: this.user.id };
    this.userService.updateUser(details).subscribe((res: any) => {});
    this.authService.refreshToken().subscribe((res: any) => {});
  }

  handleCancel(): void {
    this.modalService.closeModal();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

}
