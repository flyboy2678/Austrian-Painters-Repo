import { Component, inject } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  messagesService = inject(MessagesService);
  userService = inject(UserService);
  authService = inject(AuthService);
  users: any = [];
  user: any;
  messages: any = [];
  sender_id: string = '';
  receiver_id: string = '';
  newMessage: string = '';

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.sender_id = this.user.id;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log('hello', this.users);
    });
  }

  loadMessages() {
    this.messagesService
      .getMessages(this.sender_id, this.receiver_id)
      .subscribe((data) => {
        this.messages = data;
      });
  }

  sendMessage() {
    this.messagesService
      .sendMessage(this.sender_id, this.receiver_id, this.newMessage)
      .subscribe(() => {
        this.loadMessages();
      });
  }

  selectUser(receiverId: any) {
    this.receiver_id = receiverId;
    this.loadMessages();
  }
}
