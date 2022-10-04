import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  changeMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  currentMessage: any;

  constructor() { }
}
