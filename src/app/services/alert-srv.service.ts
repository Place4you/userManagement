// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertSrvService {
  private alertSubject = new BehaviorSubject<{ type: 'success' | 'error'; message: string } | null>(null);
  alert$ = this.alertSubject.asObservable();

  showSuccess(message: string) {
    this.alertSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.alertSubject.next({ type: 'error', message });
  }

  clear() {
    this.alertSubject.next(null);
  }
}
