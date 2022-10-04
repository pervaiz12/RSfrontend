import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private messageSource = new BehaviorSubject("per");
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  changeMessage(message: any) {
    console.log("huuuuuuuuuuuuuuu", message)
    this.messageSource.next(message)
  }
}
