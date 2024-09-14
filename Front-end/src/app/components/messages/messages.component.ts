import { Component, inject, OnInit } from '@angular/core';
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
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messagesService = inject(MessagesService);
  userService = inject(UserService);
  authService = inject(AuthService);
  users: any = [];
  user: any;
  messages: any = [];
  sender_id: string = '';
  receiver_id: string = '';
  newMessage: string = '';

  ngOnInit() {
    this.messagesService.onNewMessage().subscribe((data: any) => {
      if (
        (data.sender_id === this.sender_id &&
          data.receiver_id === this.receiver_id) ||
        (data.sender_id === this.receiver_id &&
          data.receiver_id === this.sender_id)
      ) {
        this.messages.push(data);
        return;
      }
      console.log('New message received');
    });
  }

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.sender_id = this.user.id;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
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
        this.newMessage = '';
        this.loadMessages();
      });
  }

  selectUser(receiverId: any) {
    this.receiver_id = receiverId;
    this.loadMessages();
  }
}
