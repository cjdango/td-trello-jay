import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LISTS, LIST_DETAIL } from '../../constants/endpoint.constants';
import { resolveEndpoint } from '../../utils/http.utils';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  constructor(private http: HttpClient) {}

  fetchColumns(boardPK: string): Observable<any> {
    const url = resolveEndpoint(LISTS, { boardPK });
    return this.http.get<any>(url);
  }

  createColumn(payload: { title: string }, boardPK: string): Observable<any> {
    const url = resolveEndpoint(LISTS, { boardPK });
    return this.http.post<any>(url, payload);
  }

  updateColumn(
    payload: { cards_positions: Array<number> },
    columnPK: string
  ): Observable<any> {
    const url = resolveEndpoint(LIST_DETAIL, { columnPK });
    return this.http.put<any>(url, payload);
  }
}
