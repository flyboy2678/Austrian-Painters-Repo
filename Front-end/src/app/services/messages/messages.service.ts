import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);
  private socket = io('http://localhost:3000');
  constructor() {}

  sendMessage(
    sender_id: string,
    receiver_id: string,
    message: string
  ): Observable<any> {
    return this.http.post('http://localhost:3000/api/sendMessage', {
      sender_id,
      receiver_id,
      message,
    });
  }

  getMessages(sender_id: string, receiver_id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/getMessages/${sender_id}/${receiver_id}`
    );
  }

  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }
}
