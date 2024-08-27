import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-managetasks',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './managetasks.component.html',
  styleUrl: './managetasks.component.css',
})
export class ManagetasksComponent {
  faPlus = faPlus;
}
