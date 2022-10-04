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


  UpdateuserProfile(data: any) {
    let API_URL = `${this.REST_API}/api/user/Updateuserprofile`;
    return this.httpClient.post(API_URL, data)
  }

  // UpdateuserProfile
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




  //get employee type list getReportToMember
  getEmpType(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/emptype`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }

  getReportToMember(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/getReportToMember`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }

  //get Report to  type list getReportTo
  getReportTo(id: any): Observable<any> {
    const queryParams = `?id=${id}`;
    console.log(">>>>>>>>>>>>>>>", queryParams)
    let API_URL = `${this.REST_API}/api/user/getReportTo`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
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


  /// by using dataTable
  getusers(pagesize: any,) {
    console.log(pagesize.length)
    const queryParams = `?draw=${pagesize.draw}&start=${pagesize.start}&length=${pagesize.length}&ordercolumn=${pagesize.order[0].column}&search=${pagesize.search['value']}&columns=${pagesize.columns}&orderdir=${pagesize.order[0].dir}`;
    let API_URL = `${this.REST_API}/api/user/GetUsersData`;

    return this.httpClient.get(API_URL + queryParams);
  }



  getAllUsers(page: any, start: any, search: any) {
    console.log(search)

    // &search=${pagesize.search['value']}
    let API_URL = `${this.REST_API}/api/user/getAllUsers`;
    const queryParams = `?start=${start}&length=${page}&search=${search}`;
    return this.httpClient.get(API_URL + queryParams);
  }


  // allrequests

  allrequests(page: any, start: any): Observable<any> {
    const queryParams = `?start=${start}&length=${page}`;

    let API_URL = `${this.REST_API}/api/user/allrequests`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  getUserLeaveDetail(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/userLeaveDetail`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }



  // getUserLeaveRequest page: any, start: any
  getUserLeaveRequest(page: any, start: any): Observable<any> {

    const queryParams = `?start=${start}&length=${page}`;
    let API_URL = `${this.REST_API}/api/user/userLeaveRequest`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  getUserInfo(id: any): Observable<any> {
    console.log(id)
    let API_URL = `${this.REST_API}/api/user/info`;
    const queryParams = `?id=${id}`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }



  //userlist addfriend  friendRequests

  friendRequests(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/friendRequests`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }

  userlist(page: any, limit: any): Observable<any> {
    const queryParams = `?page=${page}&skip=${limit}`;
    console.log(queryParams)
    let API_URL = `${this.REST_API}/api/user/userlist`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  addfriend(id: any): Observable<any> {
    const queryParams = `?draw=${id}`;
    console.log(queryParams)
    let API_URL = `${this.REST_API}/api/user/addfriend`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  allfriends(page: any, limit: any): Observable<any> {
    const queryParams = `?page=${page}&skip=${limit}`;
    let API_URL = `${this.REST_API}/api/user/allfriends`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }
  //acceptrequect  friendRequests allfriends rejectrequect
  acceptrequect(id: any): Observable<any> {
    const queryParams = `?draw=${id}`;
    console.log(queryParams)
    let API_URL = `${this.REST_API}/api/user/acceptrequect`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }
  //rejectrequect 
  rejectrequect(id: any): Observable<any> {
    const queryParams = `?draw=${id}`;
    console.log(queryParams)
    let API_URL = `${this.REST_API}/api/user/rejectrequect`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  //for notification  

  notification(page: any, limit: number): Observable<any> {
    console.log(page)
    const queryParams = `?page=${page}&skip=${limit}`;
    let API_URL = `${this.REST_API}/api/user/notification`;
    return this.httpClient.get(API_URL + queryParams).pipe(map((res: any) => {
      return res || {}
    }))
  }

  clearNotification(): Observable<any> {
    let API_URL = `${this.REST_API}/api/user/clearNotification`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }


  notificationTotal(): Observable<any> {

    let API_URL = `${this.REST_API}/api/user/notificationTotal`;
    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
    }))
  }



  // infinit looping 

  getCommentaries(page: number): Observable<Comment[]> {
    console.log("hello it is my page number ", page)
    return this.httpClient.get(
      `https://jsonplaceholder.typicode.com/comments?page=${page}&per_page=10`
    ) as Observable<Comment[]>;
  }


}
