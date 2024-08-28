import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddtaskmodalService {
  private isVisible = false;
  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getVisible(): boolean {
    return this.isVisible;
  }
}
