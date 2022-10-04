import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as io from 'socket.io-client';

import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  //for page
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 100];
  pagelength: number = 10
  start: Number = 0
  search: any = ''
  //socket
  data: any
  private socket: any;
  socketID: any
  users: any
  userDa: any
  params: any



  requests: any
  responsData: any


  constructor(private userData: AuthServiceService, private localStroge: LocalStorageService) {
    this.allrequest()
    this.setupSocketConnection()

  }

  ngOnInit(): void {

  }

  approved(id: any) {

    this.userData.approved(id).subscribe(res => {
      this.responsData = res
      console.log(res)
      this.socket.emit('sendNotifications', {
        message: `Your Leave request is approved Successfully`,
        sender: this.params.sender,
        reciever: this.responsData.userID,
        leaveRequest_id: id
      }, () => {

      })
      this.allrequest()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Leave Approved Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })


  }

  // reject

  reject(id: any) {

    this.userData.reject(id).subscribe(res => {
      this.responsData = res
      console.log("emittttttttttttttttttttttttttttttttttt", this.responsData.userID)
      this.socket.emit('message', this.responsData.userID, id);

      this.socket.emit('sendNotifications', {
        message: `Your leave request is rejected`,
        sender: this.params.sender,
        reciever: this.responsData.userID,
        leaveRequest_id: id
      }, () => {

      })

      this.allrequest()
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Leave Rejected Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })


  }

  //for get All Leave requestS
  allrequest() {
    this.userData.allrequests(this.pagelength, this.start).subscribe(res => {
      console.log(res)
      this.POSTS = res;
      this.count = this.POSTS.totalUsers
      this.requests = res
    })

  }


  //for pagination

  pageSize(event: any) {
    console.log(event.target.value)
    this.pagelength = event.target.value
    this.tableSize = event.target.value
    this.page = 1;
    this.allrequest()

  }

  onTableDataChange(event: any) {
    console.log(event)
    this.page = event;
    if (this.page > 1) {
      this.start = (this.page - 1) * this.pagelength
      console.log(this.start)
      this.allrequest();
    }
    else {
      this.start = 0

      this.allrequest();
    }
  }



  setupSocketConnection() {

    this.socket = io.connect('http://127.0.0.1:5000', { transports: ['websocket'] });
    this.userDa = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userDa).userID)
    var userId = JSON.parse(this.userDa).userID
    console.log(userId)


    this.params = {
      sender: JSON.parse(this.userDa).userID
    }
    this.socket.emit('joinNotifications', this.params, () => {
    });
    this.socket.on('recieveNotifications', (request: any) => {
      console.log(request)
    })

    this.socket.on('message-broadcast', (data: string) => {
      console.log(data)


    });

  }




}


