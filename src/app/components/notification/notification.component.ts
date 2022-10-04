import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NotificationDataService } from 'src/app/services/notification-data.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  getId: any
  request: any
  request2: any

  requestTotal: any

  //sharing
  message: any;
  subscription!: Subscription;

  //infinite looping
  throttle = 0;
  distance = 2;
  limit: number = 0
  page = 1;


  constructor(private router: Router, private route: ActivatedRoute, private userData: AuthServiceService, private data: NotificationDataService) {
    this.getId = this.route.snapshot.paramMap.get('id');
    console.log(this.getId)
    this.getnotification()


  }

  getnotification() {
    this.userData.notification(this.page, this.limit).subscribe(res => {
      this.request = res
      console.log("jdsss", this.request.data)
      this.requestTotal = this.request.data
      // this.data.changeMessage(0)
      console.log(res)
    })
  }

  ngOnInit(): void {
    //sharing
    this.subscription = this.data.currentMessage.subscribe((message: any) => this.message = message)

  }

  //looping
  onScroll(): void {
    this.userData.notification(++this.page, this.limit + 4).subscribe(res => {
      this.request = res
      for (var val of this.request.data) {
        console.log(val);
        this.requestTotal.push(val)
      }
      console.log(this.requestTotal)
      console.log(this.request.data.length)
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearNotification() {
    console.log("clear notification")
    this.userData.clearNotification().subscribe(res => {
      this.data.changeMessage(0)
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'clear Notification successfully'
      })
    })
  }
}
