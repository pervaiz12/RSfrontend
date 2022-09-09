import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private userData: AuthServiceService,) { }


  saveAuthData(userId: string) {
    localStorage.setItem('userId', JSON.stringify(userId));


  }


  //for removing auth data from localStorage 
  clearAuthData() {
    localStorage.removeItem("userId");
  }

  //get user information 

  getAuthData() {
    const userId = localStorage.getItem("userId");
    return userId

  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log("authInformation======", this.getAuthData())

  }

}
