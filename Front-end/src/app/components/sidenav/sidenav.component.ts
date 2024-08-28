import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth/auth.service';
import { filter } from 'rxjs';
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
  imports: [FontAwesomeModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  authservice = inject(AuthService);
  activeLink: string = '';
  inactiveStyle: string = 'rounded-md w-full py-2 flex flex-row gap-3 px-3';
  activeStyle: string =
    this.inactiveStyle + ' bg-dashboard_bg text-purple_accent';
  faNewspaper = faNewspaper;
  faHourglass = faHourglass;
  faListCheck = faListCheck;
  faThumbTack = faThumbTack;
  faUsers = faUsers;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeLink = event.url;
      });
  }

  isActive(path: string): boolean {
    return this.activeLink === path;
  }
}
