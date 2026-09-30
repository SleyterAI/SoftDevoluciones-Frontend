import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ReturnClientResponse } from '../interfaces/return.interface';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/return`;

  createReturn(){
    //sooon¡¡
  }

  getClientReturn(): Observable<ReturnClientResponse[]>{
    return this.http.get<ReturnClientResponse[]>(`${this.apiUrl}/my-returns`);
  }

  getClientReturnById(id: number): Observable<ReturnClientResponse> {
    return this.http.get<ReturnClientResponse>(`${this.apiUrl}/${id}`);
  }
}
