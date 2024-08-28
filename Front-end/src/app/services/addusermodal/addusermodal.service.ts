import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddusermodalService {
  constructor() {}
  private isVisible = false;

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
