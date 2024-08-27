import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  faEdit = faEdit;
  faUserPen = faUserPen;
  faTrashCan = faTrashCan;
}
