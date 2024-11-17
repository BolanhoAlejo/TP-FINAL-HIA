import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/v1/usuario';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any[]> {
    const url = `${this.apiUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  getUsuarioById(id: string): Observable<any> {
    const url = `${this.apiUrl}/getUsuarioById/${id}`;
    return this.http.get<any>(url);
  }
  postUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}/postUsuario`;
    return this.http.post<any>(url, usuario);
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    const url = `${this.apiUrl}/putUsuario/${id}`;
    return this.http.put(url, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    const url = `${this.apiUrl}/deleteUsuario/${id}`;
    return this.http.delete(url);
  }
}
