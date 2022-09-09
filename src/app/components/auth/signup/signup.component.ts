import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  ngsubmit: Boolean = false
  response: any
  typeOfEmp: any


  constructor(private fb: FormBuilder, private userData: AuthServiceService,
    private localStorage: LocalStorageService,
    private cookies: CookiesService,
    private router: Router,
    private ngZong: NgZone

  ) { this.getempType() }

  ngOnInit(): void {

    this.signupForm = this.fb.group({
      password: ['', []],
      password_confirmation: ['', []],
      email: ['', []],
      username: ['', []],
      lastname: ['', []],
      fname: ['', []],
      title: ['', []],
      company: ['', []],
      role: ['', []],
      employType: ['', []],
     


    })
  }


  login() {

    let data = {
      password: this.signupForm.value.password,
      password_confirmation: this.signupForm.value.password_confirmation,
      lastname: this.signupForm.value.lastname,
      username: this.signupForm.value.username,
      fname: this.signupForm.value.fname,
      title: this.signupForm.value.title,
      company: this.signupForm.value.company,
      role: this.signupForm.value.role,
      email: this.signupForm.value.email,
      emplType:this.signupForm.value.employType


    }

    // In services call createProduct
    this.userData.createUser(data).subscribe((res) => {
      console.log(res);
      this.response = res
      const token = this.response.token
      console.log(token)
      if (token) {

        const jwtPayload = JSON.parse(window.atob(this.response.token.split('.')[1]))

        console.log(jwtPayload)
        this.localStorage.saveAuthData(jwtPayload.userID);
        this.cookies.saveAuthData(token, jwtPayload.exp, jwtPayload.username)
        this.ngZong.run(() => { this.router.navigateByUrl('dashboard') })



      } else {
        this.ngZong.run(() => { this.router.navigateByUrl('login') })
      }
    })


  }


  getempType() {
    this.userData.getEmpType().subscribe(res => {
      var list = res
      console.log(list?.data)
      this.typeOfEmp = list?.data
      console.log(this.typeOfEmp)


    })

  }
}
