import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookiesService } from './cookies.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private CookiesService: CookiesService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.CookiesService.getAuthData();
    console.log(token)
    if (token) {
      // If we have a token, we set it to the header
      req = req.clone({
        setHeaders: { Authorization: `${token}` }
      });
    }

    return next.handle(req)


  }

}
