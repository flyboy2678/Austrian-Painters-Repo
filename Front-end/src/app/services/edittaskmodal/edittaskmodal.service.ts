import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EdittaskmodalService {
  private isVisible = false;
  private task: any;
  constructor() {}

  showModal(taskObj: any): void {
    this.task = taskObj;
    console.log(this.task);
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getVisible(): boolean {
    return this.isVisible;
  }

  getTask(): any {
    return this.task;
  }
}
