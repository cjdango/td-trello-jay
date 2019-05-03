import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from './users.interface';
import { SetNewPassPayload } from './password-reset-confirm-view/interface';
import { resolveEndpoint } from '../utils/http.utils';
import {
  USERS_PASS_RESET_CONFIRM,
  USERS_PASS_RESET,
  USERS_LOGIN,
  USERS_SIGNUP
} from '../constants/endpoint.constants';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  constructor(private http: HttpClient) {}

  login(creds: { email: string; password: string }): Observable<any> {
    const url = USERS_LOGIN;
    const request = this.http.post<any>(url, creds);
    request.subscribe(data =>
      // TODO: Create AuthService
      localStorage.setItem('user', JSON.stringify(data))
    );
    return request;
  }

  createUser(user: User): Observable<any> {
    const url = USERS_SIGNUP;
    return this.http.post<any>(url, user);
  }

  requestPasswordReset(payload: { email: string }): Observable<any> {
    const url = USERS_PASS_RESET;
    return this.http.post<any>(url, payload);
  }

  setNewPassword(
    payload: SetNewPassPayload,
    params: { uid: string; token: string }
  ): Observable<any> {
    const url = resolveEndpoint(USERS_PASS_RESET_CONFIRM, params);
    return this.http.post<any>(url, payload);
  }
}
