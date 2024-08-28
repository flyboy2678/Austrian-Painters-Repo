import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from '../../services/modal/modal.service';
import { faChevronDown, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { EditprofileComponent } from './editprofile/editprofile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NzDropDownModule,
    NzIconModule,
    EditprofileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authservice = inject(AuthService);
  modalService = inject(ModalService);
  faChevronDown = faChevronDown;
  faDoorOpen = faDoorOpen;
  isVisible = false;
  user: any;

  constructor() {
    this.user = this.authservice.getCurrentUser();
  }

  showModal(): void {
    this.modalService.showModal();
  }

  logout(): void {
    this.authservice.logout();
  }
}
