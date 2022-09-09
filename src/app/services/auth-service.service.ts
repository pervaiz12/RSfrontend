import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //nodejs Api
  REST_API: string = "http://localhost:5000";
  // clint can not comminicate with back end so 


  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  http: any;

  constructor(private httpClient: HttpClient, private cookiesService: CookiesService, private cookieService: CookieService) { }

  createUser(data: any) {
    let API_URL = `${this.REST_API}/api/user/register`;


    return this.httpClient.post(API_URL, data)
  }


  userProfile(data: any) {
    let API_URL = `${this.REST_API}/api/user/userprofile`;
    return this.httpClient.post(API_URL, data)
  }
  //userQualification

  userQualification(data: any) {
    let API_URL = `${this.REST_API}/api/user/qualificationExperience`;

    return this.httpClient.post(API_URL, data)
  }

  leaveRequest(data: any) {
    let API_URL = `${this.REST_API}/api/user/leaveRequest`;

    return this.httpClient.post(API_URL, data)
  }


  employmentProfile(data: any) {

    let API_URL = `${this.REST_API}/api/user/employment`;

    return this.httpClient.post(API_URL, data)
  }


  loginUser(data: any) {
    let API_URL = `${this.REST_API}/api/user/login`;
    return this.httpClient.post(API_URL, data)
  }

  //   getUser(id:any){
  //  return this.httpClient.get('')
  //   }

  // get users approved

  getUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/que`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }


  approved(id: any): Observable<any> {

    const queryParams = `?draw=${id}`;
    console.log(queryParams)

    let API_URL = `${this.REST_API}/api/user/approved`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))

    // return this.httpClient.get("http://localhost:5000/api/user/approved", +queryParams)

  }


  //recejct


  reject(id: any): Observable<any> {

    const queryParams = `?draw=${id}`;
    console.log(queryParams)

    let API_URL = `${this.REST_API}/api/user/reject`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))

  }

  // allrequests

  allrequests(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/allrequests`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }


  //get employee type list
  getEmpType(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/emptype`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }

  // getUserLeaveRequest
  getUserLeaveRequest(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/userLeaveRequest`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }

  // userInformation


  userInformation(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/userInformation`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }
  // getUserLeaveDetail
  getUserLeaveDetail(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/userLeaveDetail`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }


  getAllManagers(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/getAllManger`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }


  getemployment(id: any): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/empget`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }




  isLoggedIn(): boolean {

    const userId = this.cookiesService.getAuthData();
    console.log(userId)
    if (userId) {
      return true
    }
    else {
      return false;
    }
  }





  fileUpload(formData: any) {
    let API_URL = `${this.REST_API}/api/user/imageUpload`;
    return this.httpClient.post(API_URL, formData)
  }


}
