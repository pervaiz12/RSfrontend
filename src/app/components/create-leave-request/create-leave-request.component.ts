import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';

// import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-create-leave-request',
  templateUrl: './create-leave-request.component.html',
  styleUrls: ['./create-leave-request.component.css']
})
export class CreateLeaveRequestComponent implements OnInit {
  leaveRequestForm!: FormGroup;
  ngsubmit: Boolean = false
  form: Boolean = false
  response: any
  img: any
  imageArray: any
  sttDate: any
  endDa: any
  totalLeave: any

  //socket
  data: any
  private socket: any;
  socketID: any
  users: any
  userDa: any
  params: any



  requests: any
  department: string = '';
  username: string = '';
  usercode: string = '';
  lineManager: string = ''
  tcount: Number = 0
  invalidLeave: Boolean = false
  shortLeave: Boolean = false


  constructor(private fb: FormBuilder, private userData: AuthServiceService, private router: Router,
    private ngZong: NgZone, private localStroge: LocalStorageService) {
    this.getleaveDetails()
    this.setupSocketConnection()
    this.leaveRequestForm = this.fb.group({
      leaveType: ['', [Validators.required]],
      Totalleave: [''],

      short: [this.form,],
      startDate: ['', [Validators.required]],
      endDate: [this.endDa, [Validators.required,]],
      count: [this.tcount,],
      totalCount: [this.tcount,],
      attachment: [''],
      reason: ['', [Validators.required]],
      shortLeaveType: [''],

    })
  }


  leaveRequestSubmit() {

    if (this.leaveRequestForm.invalid || this.invalidLeave) {
      this.ngsubmit = true
      console.log("invalid")
      return
    } else {

      let data = {
        leaveType: this.leaveRequestForm.value.leaveType,
        short: this.leaveRequestForm.value.short,
        startDate: this.leaveRequestForm.value.startDate,
        endDate: this.leaveRequestForm.value.endDate,
        count: this.leaveRequestForm.value.count,
        totalCount: this.leaveRequestForm.value.totalCount,
        attachment: this.imageArray?.pathArray[3],
        reason: this.leaveRequestForm.value.reason,
        shortLeaveType: "shortLeaveType",


      }
      this.response = ''
      this.userData.leaveRequest(data).subscribe((res) => {
        this.response = res
        console.log("request>>>>>", this.response)
        if (this.response.status == '401') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your are out of Leave',
            showConfirmButton: true,
            timer: 5000
          })
          this.invalidLeave = true
        } else if (this.response.status == '402') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your are Selected Short leave ',
            showConfirmButton: true,
            timer: 5000
          })
          this.invalidLeave = true
        }  
        else {
          //socket
          this.socket.emit('sendNotifications', {
            message: `You have a New leave request`,
            sender: this.response.user_id,
            reciever: this.response.report_to_id,
            // leaveRequest_id: id
          }, () => {

          })
          //end

          this.leaveRequestForm.reset(); // or form.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Leave Request Created Successfully',
            showConfirmButton: true,
            timer: 5000
          })
        }
        this.router.navigateByUrl('leaverequest')

      })
    }
  }


  // get Leave Details
  getleaveDetails() {
    this.userData.getUserLeaveDetail().subscribe(res => {
      this.totalLeave = res.data[0].available
      console.log(this.totalLeave)

    })
  }

  ngOnInit(): void {
  }


  //upload Image 
  upload(event: any) {
    const file = event.target.files[0];
    this.img = file;
    this.uploadData();

  }
  uploadData() {
    let formData = new FormData();
    formData.append('image', this.img);
    this.userData.fileUpload(formData).subscribe((res) => {
      console.log(res)
      this.imageArray = res
      console.log(this.imageArray.pathArray[0])
    }, (err) => {
      console.log(err)
    })

  }

  setDate(date: any, e: any) {
    console.log(date)
    console.log(e)
    this.sttDate = e

  }
  shortleave(start: any, e: any) {
    console.log(start)
    console.log(e)
    this.shortLeave = e

  }
  endDate(date: any, e: any) {
    this.invalidLeave = false
    this.tcount = 0
    this.endDa = e
    if (this.sttDate > this.endDa) {
      console.log('sorry')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a Valid Date!'
      })
      this.invalidLeave = true

    } else {
      var date1 = new Date(this.endDa);
      var date2 = new Date(this.sttDate);
      var Time = date1.getTime() - date2.getTime();
      var Days = Time / (1000 * 3600 * 24); //Difference in Days
      this.tcount = Days + 1
      console.log(this.tcount)
      if (this.tcount > this.totalLeave) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your Leave Count is Greater than Available Leaves!',

        })
        this.tcount = 0
        this.invalidLeave = true
      } else if (this.shortLeave) {
        var date1 = new Date(this.endDa);
        var date2 = new Date(this.sttDate);
        var Time = date1.getTime() - date2.getTime();
        var Days = Time / (1000 * 3600 * 24); //Difference in Days
        this.tcount = Days + 1
        if (this.tcount > this.totalLeave || this.tcount > 1) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you are  select short leave!',

          })
          this.tcount = 0
          this.invalidLeave = true
        }


      }
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
