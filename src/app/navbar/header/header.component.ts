import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userToken: any
  username: any


  constructor(private localStroge: LocalStorageService, private cookieService: CookieService, private cookies: CookiesService, private router: Router) {

    this.router.events.subscribe((event) => {
      this.userToken = this.cookieService.get("token");
      this.username = this.cookieService.get('username');

    })
  }

  ngOnInit(): void {
  }

}
