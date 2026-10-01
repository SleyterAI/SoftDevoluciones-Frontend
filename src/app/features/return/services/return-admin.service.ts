import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReturnAdminResponse } from '../interfaces/return.interface';

@Injectable({
  providedIn: 'root'
})
export class ReturnAdminService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/admin/return`;


  getAllAdminReturn(): Observable<ReturnAdminResponse[]>{
    return this.http.get<ReturnAdminResponse[]>(this.apiUrl);
  }

  getAdminReturnById(id: number): Observable<ReturnAdminResponse> {
    return this.http.get<ReturnAdminResponse>(`${this.apiUrl}/${id}`);
  }

  getReturnsWithFilters(status?: string, fromDate?: string, toDate?: string):
                            Observable<ReturnAdminResponse[]> {
    let params = new HttpParams();

    if (status) params = params.set('status', status);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    return this.http.get<ReturnAdminResponse[]>(`${this.apiUrl}/filter`, { params });
  }

  updateReturnStatus(id: number, newStatus: string): Observable<string> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, newStatus, { responseType: 'text' });
  }
}
