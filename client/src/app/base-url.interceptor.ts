import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_URL } from './constants/endpoint.constants';
import {URLJoin} from './utils/http.utils';

@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: URLJoin(BASE_URL, req.url)
    });
    return next.handle(apiReq);
  }
}
