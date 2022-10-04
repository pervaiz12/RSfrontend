import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-all-friend',
  templateUrl: './all-friend.component.html',
  styleUrls: ['./all-friend.component.css']
})
export class AllFriendComponent implements OnInit {
  USERS: any
  userID: any
  userDa: any
  userid: any
  //infinite looping
  throttle = 0;
  distance = 2;
  limit: number = 0
  page = 1;
  allUsers: any


  constructor(private userData: AuthServiceService, private localStroge: LocalStorageService) {

    this.userDa = this.localStroge.getAuthData();
    console.log(JSON.parse(this.userDa).userID)
    this.userid = JSON.parse(this.userDa).userID
    console.log(this.userid)
  }

  ngOnInit(): void {
    this.allfriend()

  }

  allfriend() {
    this.userData.allfriends(this.page, this.limit).subscribe(
      (response) => {
        this.USERS = response;
        this.allUsers = this.USERS?.result
        console.log(this.USERS)
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //looping
  onScroll(): void {
    this.userData.allfriends(++this.page, this.limit + 4).subscribe(res => {
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
