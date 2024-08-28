import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}
  private isVisible = false;

  showModal(): void {
    this.isVisible = true;
    console.log('Modal opened');
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getVisible(): boolean {
    return this.isVisible;
  }
}
