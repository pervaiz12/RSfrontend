import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-time-off-leave',
  templateUrl: './time-off-leave.component.html',
  styleUrls: ['./time-off-leave.component.css']
})
export class TimeOffLeaveComponent implements OnInit {
  leaveRequestForm!: FormGroup;
  ngsubmit: Boolean = false
  form: Boolean = false
  response: any
  requ: any


  requests: any
  department: string = '';
  username: string = '';
  usercode: string = '';
  lineManager: string = '';

  //for pagination
  //for page
  POSTS: any;
  page: number = 1;
  count: number = 200;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 100];
  pagelength: number = 10
  start: Number = 0
  search: any = ''


  constructor(private fb: FormBuilder, private userData: AuthServiceService,
    private localStorage: LocalStorageService) {

    this.getleaveRequest()
    this.getleaveDetails()
  }


  getleaveRequest() {


    this.userData.getUserLeaveRequest(this.pagelength, this.start).subscribe(res => {
      //pagination start
      this.POSTS = res.data[0].leaveRequest;
      console.log(">>>>>>>>>>", res.totalUsers)
      this.count = res.totalUsers
      //end

      console.log(res.data[0].leaveRequest.length)
      this.requests = res.data[0].leaveRequest
      this.department = res.data[0].Employment[0].department
      this.usercode = res.data[0].Employment[0].userDefinedCode
      this.usercode = res.data[0].Employment[0].userDefinedCode
      this.lineManager = res.data[0].Employment[0].lineManager


      // lineManager
      this.username = res.data[0].username
      console.log(res)
      console.log(this.department);
      this.form = false;

    })
  }


  //get All leaves
  getleaveDetails() {
    this.userData.getUserLeaveDetail().subscribe(res => {

      this.requ = res.data[0]
      console.log(this.requ)

    })
  }

  //pagination

  onTableDataChange(event: any) {
    console.log(event)
    this.page = event;
    if (this.page > 1) {
      this.start = (this.page - 1) * this.pagelength
      console.log(this.start)
      this.getleaveRequest();
    }
    else {
      this.start = 0

      this.getleaveRequest();
    }
  }

  pageSize(event: any) {
    console.log(event.target.value)
    this.pagelength = event.target.value
    this.tableSize = event.target.value
    this.page = 1;
    this.start = 0
    this.getleaveRequest()

  }

  ngOnInit(): void {
  }

}
