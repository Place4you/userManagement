import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  // private titleSubject = new BehaviorSubject<string | null>(null);
  // title$ = this.titleSubject.asObservable();

  public titleSubject = signal<string>('');
  setTitle(title: string): void {
    this.titleSubject.set(title);
  }

}
