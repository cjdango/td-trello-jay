import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BOARDS, BOARDS_CREATE } from '../../constants/endpoint.constants';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient) {}

  fetchBoardList(): Observable<any> {
    const url = BOARDS;
    return this.http.get<any>(url);
  }

  createBoard(paylaod: { title: string }): Observable<any> {
    const url = BOARDS_CREATE;
    return this.http.post<any>(url, paylaod);
  }
}
