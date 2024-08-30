import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  constructor() {}

  createTask(task: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/createTask', task);
  }

  getAllTasks(): Observable<any> {
    return this.http.get('http://localhost:3000/api/getAllTasks');
  }

  getUserTasks(userid: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/getUserTasks/${userid}`);
  }

  setProgress(taskid: string, progress: string): Observable<any> {
    return this.http.put(`http://localhost:3000/api/setProgress/${taskid}`, {
      status: progress,
    });
  }

  deleteTask(taskid: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/deleteTask/${taskid}`);
  }
}
