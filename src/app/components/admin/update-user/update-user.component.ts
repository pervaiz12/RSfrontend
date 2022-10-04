import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  profileForm!: FormGroup;
  userrole: any
  typeOfEmp: any
  getId: any
  ent: any
  empType: string = '';
  empTypeId: string = '';
  reportTo: string = '';
  reportToName: string = '';
  reTo: any;

  designation: string[] = ['user', 'hr', 'manager'];


  constructor(private fb: FormBuilder, private userData: AuthServiceService, private route: ActivatedRoute, private router: Router,
    private ngZong: NgZone) {

    this.getId = this.route.snapshot.paramMap.get('id');

    this.getempType()
    this.getReportToMember()
    this.getReportTo()
    //get data  by id 
    this.profileForm = this.fb.group({
      username: [''],
      email: ['',],
      fname: ['',],
      lastname: ['',],
      title: ['',],
      company: ['',],
      role: [''],
      empType: [this.empType],
      reportTo: [this.reportToName]


    })

    console.log(this.profileForm)
  }

  ngOnInit(): void {
    // const getId = this.route.snapshot.paramMap.get('id');
    const getId = this.getId
    this.userData.getUserInfo(getId).subscribe(res => {
      var response = res.data[0]
      console.log(response.emptype_id)
      var pro = response.emptype_id
      console.log('===========>>>>>>>>>>>>>>>>>>>>>>>', pro);
      this.empType = pro._id
      this.empTypeId = pro._id

      this.ent = response.emptype_id.empType
      console.log(pro._id)
      this.userrole = response.role
      this.profileForm = this.fb.group({
        username: [response['username']],
        email: [response['email'],],
        fname: [response['fname'],],
        lastname: [response['lastname'],],
        title: [response['title'],],
        company: [response['company'],],
        role: [response['role'],],
        empType: [pro['_id']],
        reportTo: [this.reportToName],
      })

    })



  }

  profileUpdate() {
    console.log(this.profileForm.value.reportTo)

    let data = {
      lastname: this.profileForm.value.lastname,
      username: this.profileForm.value.username,
      fname: this.profileForm.value.fname,
      title: this.profileForm.value.title,
      company: this.profileForm.value.company,
      role: this.profileForm.value.role,
      email: this.profileForm.value.email,
      emplType: this.profileForm.value.empType,
      reportToId: this.profileForm.value.reportTo,
      user_id: this.getId

    }
    console.log(data)

    this.userData.UpdateuserProfile(data).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User Data has been Updated Successfully',
        showConfirmButton: true,
        timer: 5000
      })
      console.log(res)
    })
    this.ngZong.run(() => { this.router.navigateByUrl('userslist') })


  }

  getempType() {
    this.userData.getEmpType().subscribe(res => {
      var list = res
      console.log(list?.data)
      this.typeOfEmp = list?.data
      console.log(this.typeOfEmp)
    })
  }


  //list of manager and Hr
  getReportToMember() {
    this.userData.getReportToMember().subscribe(res => {
      var list = res
      console.log(list?.data)
      this.reTo = list?.data
      console.log(">>>>>>>>>>>>>>>...", this.reTo)
      // console.log(this.typeOfEmp)
    })
  }

  getReportTo() {
    this.userData.getReportTo(this.getId).subscribe(res => {
      var list = res
      console.log(list?.data._id)
      this.reportToName = list?.data._id

    })

  }


}
