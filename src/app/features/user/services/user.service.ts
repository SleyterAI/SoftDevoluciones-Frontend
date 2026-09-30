import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

import { UsuarioRequest, UsuarioResponse } from "../interfaces/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/user`;

  createUser(request: UsuarioRequest): Observable<UsuarioRequest> {
    return this.http.post<UsuarioRequest>(`${this.apiUrl}/register`, request);
  }

  getAllUser(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.apiUrl);
  }

  promoverAdmin(id: number, role: String): Observable<UsuarioRequest> {
      return this.http.patch<UsuarioRequest>(`${this.apiUrl}/${id}/role`, { role });
    }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserIdByEmail(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/id`);
  }
}
