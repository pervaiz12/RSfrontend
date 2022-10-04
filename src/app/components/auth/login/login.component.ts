import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  ngsubmit: Boolean = false
  response: any

  constructor(
    private userData: AuthServiceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private cookies: CookiesService,
    private router: Router,
    private ngZong: NgZone
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      password: ['', []],
      email: ['', []],
    })


  }

  login() {
    let data = {
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,

    }
    // In services call createProduct
    this.userData.loginUser(data).subscribe((res) => {
      console.log("refresh token",res);
      this.response = res
      const token = this.response.token
      const refreshToken = this.response.refreshToken
      console.log(token)
      console.log("refreshTokenrefreshToken",refreshToken)

      if (token) {
        //decode token
        const jwtPayload = JSON.parse(window.atob(this.response.token.split('.')[1]))

        console.log(jwtPayload)
        this.localStorage.saveAuthData(jwtPayload);
        this.cookies.saveAuthData(token,refreshToken, jwtPayload.exp, jwtPayload.username);
        this.userData.userInformation().subscribe(res => {
          console.log(res.data[0].role)

          if (res.data[0].role == "admin") {
            console.log("admin login")
            //this.ngZong.run(() => { this.router.navigateByUrl('admindashboard') })
            window.location.href = "/admindashboard";

          } else if (res.data[0].role == "manager") {
            console.log("manager login")
            window.location.href = "/dashboard";

          }
          else if (res.data[0].role == "hr") {
            console.log("hr login")
            window.location.href = "/dashboard";

          } else {
            // this.ngZong.run(() => { this.router.navigateByUrl('dashboard') })
            window.location.href = "/dashboard";
            console.log("user login")
          }
        })
        // this.ngZong.run(() => { this.router.navigateByUrl('dashboard') })



      } else {
        this.ngZong.run(() => { this.router.navigateByUrl('login') })
      }
    })
  }

}
