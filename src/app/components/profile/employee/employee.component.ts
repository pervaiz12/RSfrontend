import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  profileForm!: FormGroup;
  ngsubmit: Boolean = false
  userName: any
  title: any
  company: any
  img: any
  imageArray: any
  respon: any
  imageSelected: boolean = false

  constructor(private fb: FormBuilder, private userData: AuthServiceService,
    private localStorage: LocalStorageService,
    private cookies: CookiesService,
    private router: Router,
    private ngZong: NgZone,


  ) {


    const getId = this.localStorage.getAuthData();

    console.log(getId)
    //get data  by id 
    this.profileForm = this.fb.group({
      username: [''],
      email: ['',],
      fname: ['',],
      lastname: ['',],
      title: ['',],
      company: ['',],
      role: [''],
      salutation: [''],
      fatherName: [''],
      gender: [''],
      maritalStatus: [''],
      religion: [''],
      nationality: [''],
      bloodgroup: [''],
      dob: [''],
      lineNumber: [''],
      quickEmail: [''],
      mobile: [''],
      CNIC: [''],
      CNICExpire: [''],
      licenseNo: [''],
      liceseExpire: [''],


    })
  }


  ngOnInit(): void {


    const getId = this.localStorage.getAuthData();

    console.log(getId)
    //get data  by id 
    this.userData.getUser(getId).subscribe(res => {
      this.respon = res.data[0]
      var response = res.data[0]
      console.log("new daatatta", response?.userProfile[0]?.img.profile_pic.original)

      var profileResponse = response?.userProfile[0]
      this.userName = response.username
      this.title = response.title
      this.company = response.company
      var quickContact = response?.quickContact
      var IdentityCard = response?.IdentityCard
      var Driving = response?.Driving
      console.log(response.userProfile[0]?.maritalStatus)
      console.log(profileResponse?.gender)
      this.profileForm = this.fb.group({
        username: [response['username']],
        email: [response['email'],],
        fname: [response['fname'],],
        lastname: [response['lastname'],],
        title: [response['title'],],
        company: [response['company'],],
        role: [response['role'],],
        salutation: [profileResponse?.['salutation']],
        fatherName: [profileResponse?.['fatherName']],
        gender: [profileResponse?.['gender']],
        maritalStatus: [profileResponse?.['maritalStatus']],
        religion: [profileResponse?.['religion']],
        nationality: [profileResponse?.['nationality']],
        bloodgroup: [profileResponse?.['bloodgroup']],
        dob: [profileResponse?.['dob']],
        licenseNo: [Driving?.['licenseNo']],
        liceseExpire: [Driving?.['liceseExpire']],
        lineNumber: [quickContact?.['lineNumber']],
        quickEmail: [quickContact?.['email']],
        mobile: [quickContact?.['mobile']],
        CNIC: [IdentityCard?.['CNIC']],
        CNICExpire: [IdentityCard?.['CNICExpire']],


      })

    })
  }

  profileUpdate() {
    console.log(this.profileForm.value.maritalStatus)

    let data = {
      lastname: this.profileForm.value.lastname,
      attachment: this.imageArray?.pathArray,
      username: this.profileForm.value.username,
      fname: this.profileForm.value.fname,
      title: this.profileForm.value.title,
      company: this.profileForm.value.company,
      email: this.profileForm.value.email,
      salutation: this.profileForm.value.salutation,
      fatherName: this.profileForm.value.fatherName,
      gender: this.profileForm.value.gender,
      maritalStatus: this.profileForm.value.maritalStatus,
      religion: this.profileForm.value.religion,
      nationality: this.profileForm.value.nationality,
      bloodgroup: this.profileForm.value.bloodgroup,
      dob: this.profileForm.value.dob,
      lineNumber: this.profileForm.value.lineNumber,
      quickEmail: this.profileForm.value.quickEmail,
      mobile: this.profileForm.value.mobile,
      CNICExpire: this.profileForm.value.CNICExpire,
      CNIC: this.profileForm.value.CNIC,
      licenseNo: this.profileForm.value.licenseNo,
      liceseExpire: this.profileForm.value.liceseExpire

    }
    console.log(data)
    this.userData.userProfile(data).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Data has been Updated Successfully',
        showConfirmButton: true,
        timer: 5000
      })
      console.log(res)
    })
    console.log(this.profileForm.value)
    console.log("profileUpdated ")
  }


  //upload Image 
  upload(event: any) {
    const file = event.target.files[0];
    console.log(file)


    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };


    this.img = file;
    this.uploadData();

  }
  uploadData() {
    let formData = new FormData();
    formData.append('image', this.img);
    this.userData.fileUpload(formData).subscribe((res) => {
      console.log(res)
      this.imageArray = res
      this.imageSelected = true
      console.log(this.imageArray.pathArray[0])
    }, (err) => {
      console.log(err)
    })

  }

}
