import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requests: any

  constructor(private userData: AuthServiceService) {
    this.getleaveDetails()
  }

  ngOnInit(): void {
  }



  getleaveDetails() {


    this.userData.getUserLeaveDetail().subscribe(res => {
      this.requests = res.data[0]
      console.log(this.requests)

    })
  }

}
