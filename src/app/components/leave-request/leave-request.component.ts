import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  requests: any


  constructor(private userData: AuthServiceService,) {
    this.allrequest()

  }

  ngOnInit(): void {
  }

  approved(id: any) {

    this.userData.approved(id).subscribe(res => {

      console.log(res)
      this.allrequest()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'leave approved success',
        showConfirmButton: false,
        timer: 1500
      })
    })


  }

  // reject

  reject(id: any) {

    this.userData.reject(id).subscribe(res => {

      console.log(res)
      this.allrequest()
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'leave reject success',
        showConfirmButton: false,
        timer: 1500
      })
    })


  }

  allrequest() {
    this.userData.allrequests().subscribe(res => {
      console.log(res)
      this.requests = res
    })

  }


}
