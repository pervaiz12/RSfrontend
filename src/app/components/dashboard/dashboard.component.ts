import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as io from 'socket.io-client';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requests: any
  data: any
  private socket: any;
  userDa: any
  messageData: any
  params:any
  message: any = []

  constructor(private userData: AuthServiceService, private localStroge: LocalStorageService) {
    this.getleaveDetails()
    this.setupSocketConnection()

  }

  ngOnInit(): void {
  }



  // getUserLeaveDet

  getleaveDetails() {
    this.userData.getUserLeaveDetail().subscribe(res => {
      this.requests = res.data[0]
      console.log(this.requests)

    })
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
      console.log(request)
    })

    this.socket.on('message-broadcast', (data: string) => {
      this.messageData = data
      if (this.messageData.id === userId) {
        this.message.push(this.messageData)
      }
      console.log(this.message)

    });

  }

}
