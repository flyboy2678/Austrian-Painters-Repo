import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from '../../services/modal/modal.service';
import { faChevronDown, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangepasswordmodalService } from '../../services/changepasswordmodal/changepasswordmodal.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { StreakComponent } from './streak/streak.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NzDropDownModule,
    NzIconModule,
    EditprofileComponent,
    ChangepasswordComponent,
    StreakComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authservice = inject(AuthService);
  modalService = inject(ModalService);
  changepasswordmodalService = inject(ChangepasswordmodalService);
  faChevronDown = faChevronDown;
  faDoorOpen = faDoorOpen;
  isVisible = false;
  user: any;
  initials: string;

  constructor() {
    this.user = this.authservice.getCurrentUser();
    this.initials = this.user.firstName[0] + this.user.lastName[0];
  }

  showModal(): void {
    this.modalService.showModal();
  }

  showChangePasswordModal(): void {
    this.changepasswordmodalService.showModal();
  }

  logout(): void {
    this.authservice.logout();
  }
}
