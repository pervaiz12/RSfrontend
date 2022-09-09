import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from './services/cookies.service';


import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieValue: any
  userToken: any

  title = 'frontend';
  constructor(private localStroge: LocalStorageService, private cookieService: CookieService, private cookies: CookiesService, private router: Router) {

    this.router.events.subscribe((event) => {
      this.userToken = this.cookieService.get("token");
    

    })

  }

  ngOnInit(): void {
    this.localStroge.autoAuthUser();
    this.cookies.autoAuthUser();
    this.userToken = this.cookieService.get("token");




  }
}
