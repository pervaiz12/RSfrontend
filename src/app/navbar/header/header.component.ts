import { Component, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from 'src/app/services/cookies.service';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
import { NotificationDataService } from 'src/app/services/notification-data.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //share
  message: any;
  subscription!: Subscription;
  totalNotifaction: any;
  notityCount: any

  userToken: any
  username: any
  userId: any
  uId: any
  requests: any
  // data: any
  private socket: any;
  userDa: any
  messageData: any
  params: any
  // message: any = []
  notifi: any = []
  constructor(private localStroge: LocalStorageService, private userData: AuthServiceService, private cookieService: CookieService, private cookies: CookiesService, private router: Router, private data: NotificationDataService) {
    this.userId = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userId).userID)
    this.uId = JSON.parse(this.userId).userID
    this.setupSocketConnection()
    console.log(">>>>>>>>>>>>>>>>>>PPPPPPPPP", this.uId)
    this.router.events.subscribe((event) => {
      this.userToken = this.cookieService.get("token");
      this.username = this.cookieService.get('username');

    })
    this.getnotification()
  }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe((message: any) => this.message = message)
    console.log("trrrrrrr", this.message)







    // for dropdown
    $(document).ready(function () {
      var down = false;
      $('#bell').click(function (e) {
        var color = $(this).text();
        if (down) {

          $('#box').css('height', '0px');
          $('#box').css('opacity', '0');
          down = false;
        } else {

          $('#box').css('height', 'auto');
          $('#box').css('opacity', '1');
          down = true;

        }

      });

    });

  }


  setupSocketConnection() {

    this.userDa = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userDa).userID)
    var userId = JSON.parse(this.userDa).userID
    console.log(userId)

    this.socket = io.connect('http://127.0.0.1:5000', { transports: ['websocket'] });

    this.params = {
      sender: JSON.parse(this.userDa).userID
    }
    this.socket.emit('joinNotifications', this.params, () => {
      console.log("userer")
    });
    this.socket.on('recieveNotifications', (request: any) => {
      console.log("sottttttttttttttttttt", request)
      this.notifi.push(request)
      console.log(this.notifi)
      console.log(this.notifi.length)
      this.notityCount = this.notityCount + 0.5

    })
    this.socket.on('message-broadcast', (request: any) => {
      console.log(request)
      this.notityCount = this.notityCount + 1

    })

  }

  getnotification() {
    this.userData.notificationTotal().subscribe(res => {
      this.totalNotifaction = res
      console.log("this.totalNotifaction", this.totalNotifaction)
      this.notityCount = this.totalNotifaction.totalNotification
      console.log(this.notityCount)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
