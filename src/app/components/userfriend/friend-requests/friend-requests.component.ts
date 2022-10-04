import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  USERS: any
  userID: any
  constructor(private userData: AuthServiceService) {
    this.userlist()
  }

  ngOnInit(): void {
  }


  userlist() {
    this.userData.friendRequests().subscribe(
      (response) => {
        this.USERS = response;
        console.log(this.USERS)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  acceptrequect(id: any) {
    this.userData.acceptrequect(id).subscribe(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Accepted Friend Request  Successfully',
        showConfirmButton: false,
        timer: 3000
      })
      this.userlist()
    })
  }

  //rejectrequect

  rejectrequect(id: any) {
    this.userData.rejectrequect(id).subscribe(res => {
      console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Rejected Friend Request  Successfully',
        showConfirmButton: false,
        timer: 3000
      })
      this.userlist()
    })
  }
}
