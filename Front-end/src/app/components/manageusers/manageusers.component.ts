import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user/user.service';
import { EditusermodalService } from '../../services/editusermodal/editusermodal.service';
import { AddusermodalService } from '../../services/addusermodal/addusermodal.service';
import {
  faEdit,
  faUserPen,
  faTrashCan,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { UserFormComponent } from './editusers/editusers.component';

@Component({
  selector: 'app-manageusers',
  standalone: true,
  imports: [FontAwesomeModule, UserFormComponent],
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css',
})
export class ManageusersComponent {
  userService = inject(UserService);
  editUserModalService = inject(EditusermodalService);
  addUserModalService = inject(AddusermodalService);
  isVisible: boolean = false;
  faEdit = faEdit;
  faUserPen = faUserPen;
  faTrashCan = faTrashCan;
  faPlus = faPlus;
  users: any;

  constructor() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user).subscribe(() => {
      this.users = this.users.filter((u: any) => u.Emp_id !== user.Emp_id);
    });
  }

  openEditUserModal(user: any) {
    this.editUserModalService.showModal(user);
  }

  openAddUserModal() {
    this.addUserModalService.showModal();
  }
}
