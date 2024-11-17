import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/v1/cliente';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  getClienteById(id: any): Observable<any[]> {
    const url = `${this.apiUrl}/getClienteById/${id}`;
    return this.http.get<any[]>(url);
  }

  postCliente(cliente: any): Observable<any> {
    const url = `${this.apiUrl}/postCliente`;
    return this.http.post<any>(url, cliente);
  }

  updateCliente(cliente: any): Observable<any> {
    const url = `${this.apiUrl}/putCliente/${cliente._id}`;
    return this.http.put<any>(url, cliente);
  }

  deleteCliente(id: any): Observable<any> {
    const url = `${this.apiUrl}/deleteCliente/${id}`;
    return this.http.delete(url);
  }
}