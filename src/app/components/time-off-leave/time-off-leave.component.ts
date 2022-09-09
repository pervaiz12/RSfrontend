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
  lineManager: string = ''

  constructor(private fb: FormBuilder, private userData: AuthServiceService,
    private localStorage: LocalStorageService) {

    this.getleaveRequest()
    this.getleaveDetails()
  }


  getleaveRequest() {


    this.userData.getUserLeaveRequest().subscribe(res => {
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


  ngOnInit(): void {
  }

}
