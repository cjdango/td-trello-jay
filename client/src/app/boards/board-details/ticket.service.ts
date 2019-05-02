import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LIST_DETAIL } from 'src/app/constants/endpoint.constants';
import { resolveEndpoint } from 'src/app/utils/http.utils';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  createTicket(payload: { title: string }, columnPK: string): Observable<any> {
    console.log(columnPK)
    const url = resolveEndpoint(LIST_DETAIL, { columnPK });
    console.log(url)
    return this.http.post<any>(url, payload);
  }
}
