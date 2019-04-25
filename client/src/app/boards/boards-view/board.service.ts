import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardsURL = 'boards';

  constructor(private http: HttpClient) {}

  fetchBoardList(): Observable<any> {
    const url = `${this.boardsURL}/`;
    return this.http.get<any>(url);
  }
}
