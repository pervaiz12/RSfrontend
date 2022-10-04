import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as io from "socket.io-client";
const SOCKET_ENDPOINT = 'localhost:5000';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-frined',
  templateUrl: './frined.component.html',
  styleUrls: ['./frined.component.css']
})
export class FrinedComponent implements OnInit {
  USERS: any
  allUsers: any
  userID: any

  message: any
  socket: any;
  reciever: any;
  userId: any
  sender: any
  params: any
  userDa: any
  // for infinite looping
  //infinite looping
  throttle = 0;
  distance = 2;
  limit: number = 0
  page = 1;

  constructor(private userData: AuthServiceService, private localStroge: LocalStorageService) {
    this.userlist()
  }

  ngOnInit(): void {
    this.setupSocketConnection()
  }

  userlist() {
    this.userData.userlist(this.page, this.limit).subscribe(
      (response) => {
        this.USERS = response;
        this.allUsers = this.USERS?.data
        console.log(this.USERS?.userID)
        this.userID = this.USERS?.userID
        // this.USERS?.data.filter((item: any) => {
        //   item.friends?.filter((res: any) => {

        //     console.log(res.status)

        //   })
        // });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  addFriend(id: any) {
    console.log(id)
    this.userData.addfriend(id).subscribe(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Friend Request Send  Successfully',
        showConfirmButton: false,
        timer: 2000
      })
      this.socket.emit('message', {
        message: "You have a new Friend Request",
        sender: this.userId,
        reciever: id,
      }, () => {

      })
      this.userlist()
    })
  }


  setupSocketConnection() {
    this.userDa = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userDa).userID)
    this.userId = JSON.parse(this.userDa).userID
    this.socket = io.connect(SOCKET_ENDPOINT, { transports: ['websocket'] });
    this.params = {
      sender: JSON.parse(this.userDa).userID
    }
    this.socket.emit('joinNotifications', this.params, () => {
      console.log("userer")
    });
    this.socket.on('message-broadcast', (data: string) => {

    });
  }


  //looping
  onScroll(): void {
    this.userData.userlist(++this.page, this.limit + 4).subscribe(res => {
      this.USERS = res
      for (var val of this.USERS.data) {
        console.log(val);
        this.allUsers.push(val)
      }
      console.log(this.allUsers)
      console.log(this.allUsers.data.length)
    })
  }

}
