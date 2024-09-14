import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  messagesService = inject(MessagesService);
  userService = inject(UserService);
  authService = inject(AuthService);
  users: any = [];
  user: any;
  messages: any = [];
  sender_id: string = '';
  receiver_id: string = '';
  newMessage: string = '';
  private newMessageSubscription!: Subscription;

  constructor() {
    this.user = this.authService.getCurrentUser();
    this.sender_id = this.user.id;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit() {
    // Subscribe to new messages
    this.newMessageSubscription = this.messagesService
      .onNewMessage()
      .subscribe((message: any) => {
        console.log('Receiver id: ', message.receiver_id);
        console.log('Sender id: ', message.sender_id);
        console.log('message', message);
        console.log('this.sender_id', this.sender_id);
        // if (
        //   message.receiver_id === this.receiver_id ||
        //   message.sender_id === this.sender_id
        // ) {
        this.messages.push(message); // Update messages array
        // }
      });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.newMessageSubscription) {
      this.newMessageSubscription.unsubscribe();
    }
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
        this.newMessage = ''; // Clear input field
        this.loadMessages(); // Optionally reload messages
      });
  }

  selectUser(receiverId: any) {
    this.receiver_id = receiverId;
    this.loadMessages();
  }
}
