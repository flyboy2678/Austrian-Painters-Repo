import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangepasswordmodalService {
  private isVisible: boolean = false;

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  getIsVisible(): boolean {
    return this.isVisible;
  }

  constructor() {}
}
