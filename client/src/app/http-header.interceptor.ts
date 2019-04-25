import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let apiReq = req;

    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      const { token } = userInfo;
      apiReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`)
      });
    }

    return next.handle(apiReq);
  }
}
