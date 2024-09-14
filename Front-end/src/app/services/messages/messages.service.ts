import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private http = inject(HttpClient);
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(
    sender_id: string,
    receiver_id: string,
    message: string
  ): Observable<any> {
    this.socket.emit('newMessage', {
      sender_id,
      receiver_id,
      message,
    });
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
        console.log('Listening for new messages');
        observer.next(data);
      });
    });
  }
}
