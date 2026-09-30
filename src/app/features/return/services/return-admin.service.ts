import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReturnAdminResponse } from '../interfaces/return.interface';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/admin/return`;


  getAllAdminReturn(): Observable<ReturnAdminResponse[]>{
    return this.http.get<ReturnAdminResponse[]>(this.apiUrl);
  }

  getAdminReturnById(id: number): Observable<ReturnAdminResponse> {
    return this.http.get<ReturnAdminResponse>(`${this.apiUrl}/${id}`);
  }

  getReturnsWithFilters(){

  }

  updateReturnStatus(){

  }
}
