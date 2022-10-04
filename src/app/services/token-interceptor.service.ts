import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { CookiesService } from './cookies.service';
import { TokenService } from './token.service';




@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  errorMessage: any
  refresh: Boolean = false;
  constructor(private CookiesService: CookiesService, private http: HttpClient) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.CookiesService.getAuthData();

    // refreshToken
    // const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
    // console.log("oppsaksiddk", jwtPayload)


    console.log(token)
    if (token) {
      // If we have a token, we set it to the header
      req = req.clone({
        setHeaders: { Authorization: `${token}` }
      });
      return next.handle(req).pipe(

        retry(1),

        catchError((error: HttpErrorResponse) => {
          this.errorMessage = error
          console.log("kkkkkkkkkkkkkkkkkkkkkkkk", this.errorMessage.error.code)

          if (this.errorMessage.error.code === 401 && !this.refresh) {
            var refreshToken = this.CookiesService.getRefreshToken();
            console.log("rerrerererrerererer", refreshToken)

            return this.http.post('http://localhost:5000/api/user/refreshToken', { token: refreshToken }).pipe(
              switchMap((res: any) => {
                console.log(res.token)
                const newAccessToken = res.token

                // this.tokenService.storeAccessToken(newAccessToken)
                return next.handle(req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                }));
              })
            ) as Observable<HttpEvent<any>>;
          }
          return throwError(this.errorMessage);

        })

      )

    }
  
    return next.handle(req)

  }





}
// function handleError(arg0: (error: Error | HttpErrorResponse) => void): import("rxjs").OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
//   throw new Error('Function not implemented.');
// }

