import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:3000/api/v1/empleado';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  getEmpleadoById(id: any): Observable<any[]> {
    const url = `${this.apiUrl}/getEmpleadoById/${id}`;
    return this.http.get<any[]>(url);
  }

  postEmpleado(empleado: any): Observable<any> {
    const url = `${this.apiUrl}/postEmpleado`;
    return this.http.post<any>(url, empleado);
  }

  updateEmpleado(empleado: any): Observable<any> {
    const url = `${this.apiUrl}/putEmpleado/${empleado._id}`;
    return this.http.put<any>(url, empleado);
  }

  deleteEmpleado(id: any): Observable<any> {
    const url = `${this.apiUrl}/deleteEmpleado/${id}`;
    return this.http.delete(url);
  }
}
