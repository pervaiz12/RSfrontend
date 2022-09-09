import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
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


  requests: any
  department: string = '';
  username: string = '';
  usercode: string = '';
  lineManager: string = ''
  tcount: any


  constructor(private fb: FormBuilder, private userData: AuthServiceService, private router: Router,
    private ngZong: NgZone) {
    this.leaveRequestForm = this.fb.group({
      leaveType: [''],
      short: [this.form,],
      startDate: ['',],
      endDate: [this.endDa,],
      count: [this.tcount,],
      totalCount: ['',],
      attachment: [''],
      reason: [''],
      shortLeaveType: [''],

    })
  }


  leaveRequestSubmit() {

    let data = {
      leaveType: this.leaveRequestForm.value.leaveType,
      short: this.leaveRequestForm.value.short,
      startDate: this.leaveRequestForm.value.startDate,
      endDate: this.leaveRequestForm.value.endDate,
      count: this.leaveRequestForm.value.count,
      totalCount: this.leaveRequestForm.value.totalCount,
      attachment: this.imageArray.pathArray[3],
      reason: this.leaveRequestForm.value.reason,
      // shortLeaveType: this.leaveRequestForm.value.shortLeaveType,
      shortLeaveType: "shortLeaveType",


    }
    this.response = ''
    this.userData.leaveRequest(data).subscribe((res) => {
      this.response = res
      if (this.response.status == '401') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Your are out of leave',
          showConfirmButton: true,
          timer: 5000
        })
      } else {
        this.leaveRequestForm.reset(); // or form.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your leave request created success',
          showConfirmButton: true,
          timer: 5000
        })
      }
      this.router.navigateByUrl('leaverequest')

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
  endDate(date: any, e: any) {
    this.endDa = e
    if (this.sttDate > this.endDa) {
      console.log('sorry')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a valid Date!'
      })

    } else {
      console.log("good ho gaya")
      console.log(this.sttDate)
      var date1 = new Date(this.endDa);
      var date2 = new Date(this.sttDate);
      console.log(date1)
      var Time = date1.getTime() - date2.getTime();
      var Days = Time / (1000 * 3600 * 24); //Diference in Days
      this.tcount = Days+1
      console.log(this.tcount)
      if (Days < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }
  }


}
