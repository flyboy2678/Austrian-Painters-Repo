import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user/user.service';
import { EditusermodalService } from '../../services/editusermodal/editusermodal.service';
import { AddusermodalService } from '../../services/addusermodal/addusermodal.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  faEdit,
  faUserPen,
  faTrashCan,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { EditusersComponent } from './editusers/editusers.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manageusers',
  standalone: true,
  imports: [
    FontAwesomeModule,
    EditusersComponent,
    AdduserComponent,
    NzTableModule,
    NzDropDownModule,
    CommonModule,
    FormsModule,
  ],
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
  faSearch = faSearch;
  filteredUsers: any;
  users: any;
  searchName: string = '';
  visible: boolean = false;

  constructor() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user: any) =>
      user.FirstName.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  reset(): void {
    this.searchName = '';
    this.filterUsers();
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
