import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from "socket.io-client";
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
const SOCKET_ENDPOINT = 'localhost:5000';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: any
  socket: any;
  reciever: any;
  userId: any
  sender: any
  params: any
  userDa: any

  constructor(private localStroge: LocalStorageService, private userData: AuthServiceService, private route: ActivatedRoute,) {
    this.reciever = this.route.snapshot.paramMap.get('id');
    this.userId = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userId).userID)
    this.sender = JSON.parse(this.userId).userID


    this.setupSocketConnection()
  }

  ngOnInit(): void {
  }


  setupSocketConnection() {
    this.userDa = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userDa).userID)
    var userId = JSON.parse(this.userDa).userID
    console.log(userId)

    this.socket = io.connect(SOCKET_ENDPOINT, { transports: ['websocket'] });
    this.params = {
      sender: JSON.parse(this.userDa).userID
    }
    this.socket.emit('joinNotifications', this.params, () => {
      console.log("userer")
    });
    this.socket.on('message-broadcast', (data: string) => {
      console.log(data.length - 1)
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list')?.appendChild(element)
      }
    });
  }

  SendMessage() {
    // this.socket.emit('message', this.message);
    this.socket.emit('message', {
      message: this.message,
      sender: this.sender,
      reciever: this.reciever,
    }, () => {

    })
    console.log(this.message)
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list')?.appendChild(element);
    this.message = '';
  }


}
