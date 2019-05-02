import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LISTS } from '../../constants/endpoint.constants';
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
}
