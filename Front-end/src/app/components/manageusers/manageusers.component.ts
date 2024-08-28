import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../services/user/user.service';
import {
  faEdit,
  faUserPen,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manageusers',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './manageusers.component.html',
  styleUrl: './manageusers.component.css',
})
export class ManageusersComponent {
  userService = inject(UserService);
  faEdit = faEdit;
  faUserPen = faUserPen;
  faTrashCan = faTrashCan;
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
}
