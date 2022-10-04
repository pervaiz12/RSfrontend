import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  saveAuthData(token: string, refreshToken: any, expirationDate: any, username: any) {
    // this.cookieService.set('token', token);
    const now = new Date();
    now.setHours(now.getHours() + 8);
    this.cookieService.set('token', token, now);
    this.cookieService.set('username', username)
    this.cookieService.set("refreshToken", refreshToken)

  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();

  }

  getAuthData() {
    const userId = this.cookieService.get("token");
    console.log(userId)
    return userId
  }
  getRefreshToken() {
    const userId = this.cookieService.get("refreshToken");
    return userId

  }
  getAuthName() {
    const username = this.cookieService.get("username");
    console.log(username)
    return username

  }

  autoAuthUser() {
    this.getAuthData()

  }

}
