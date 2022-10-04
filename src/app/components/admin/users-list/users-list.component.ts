import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 100];

  pagelength: number = 10
  start: Number = 0
  search: any = ''



  constructor(private userData: AuthServiceService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }


  fetchUsers(): void {
    this.userData.getAllUsers(this.pagelength, this.start, this.search).subscribe(
      (response) => {
        this.POSTS = response;
        this.count = this.POSTS.totalUsers
        console.log(this.POSTS.data[0]);

      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.count)
  }






  onTableDataChange(event: any) {
    console.log(event)
    this.page = event;
    if (this.page > 1) {
      this.start = (this.page - 1) * this.pagelength
      console.log(this.start)
      this.fetchUsers();
    }
    else {
      this.start = 0

      this.fetchUsers();
    }
  }


  pageSize(event: any) {
    console.log(event.target.value)
    this.pagelength = event.target.value
    this.tableSize = event.target.value
    this.page = 1;
    this.start = 0
    this.fetchUsers()

  }


  //for Searching 
  onKey(event: any) {
    this.start = 0
    this.page = 1
    console.log(event)
    this.search = event
    this.fetchUsers();

  }
}
