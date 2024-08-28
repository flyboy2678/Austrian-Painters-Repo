import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditusermodalService {
  constructor() {}
  private isVisible = false;
  private user: any;

  showModal(userObj: any): void {
    this.user = userObj;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getVisible(): boolean {
    return this.isVisible;
  }

  getUser(): any {
    return this.user;
  }
}
