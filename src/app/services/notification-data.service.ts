import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationDataService {
  private messageSource = new BehaviorSubject("per");
  currentMessage = this.messageSource.asObservable();




  constructor() { }
  changeMessage(message: any) {
    console.log("huuuuuuuuuuuuuuu",message)
    this.messageSource.next(message)
  }
}
