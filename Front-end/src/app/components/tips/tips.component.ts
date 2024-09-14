import { Component } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'; // Import NzModalService


@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NzTableModule,
    NzModalModule,
  ],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  tips: any;

  constructor(private modal: NzModalService) {}

  handleAddTip(): void {
    this.modal.create({
      nzTitle: 'Add new tip',
      nzOnOk: () => console.log('OK clicked'),
      nzOnCancel: () => console.log('Cancel clicked')
    });
  }
}
