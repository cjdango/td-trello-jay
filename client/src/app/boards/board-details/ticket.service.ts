import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CARDS, CARD_DETAIL } from 'src/app/constants/endpoint.constants';
import { resolveEndpoint } from 'src/app/utils/http.utils';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  createTicket(payload: { title: string }, columnPK: string): Observable<any> {
    const url = resolveEndpoint(CARDS, { columnPK });
    return this.http.post<any>(url, payload);
  }

  updateTicket(payload: { lst?: string }, ticketPK: string): Observable<any> {
    const url = resolveEndpoint(CARD_DETAIL, { ticketPK });
    return this.http.put<any>(url, payload);
  }
}
