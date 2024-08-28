import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth/auth.service';
import {
  faNewspaper,
  faHourglass,
  faListCheck,
  faThumbTack,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  authservice = inject(AuthService);

  buttonStyle: string = ' rounded-md w-full py-2 flex flex-row gap-3 px-3';
  faNewspaper = faNewspaper;
  faHourglass = faHourglass;
  faListCheck = faListCheck;
  faThumbTack = faThumbTack;
  faUsers = faUsers;
}
