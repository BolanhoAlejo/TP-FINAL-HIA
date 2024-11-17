import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorito } from '../../models/favorito/favorito';
import { Producto } from '../../models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  favoritosPorUsuario! : Producto[] 
  private apiUrl = 'http://localhost:3000/api/v1/favoritos';
  constructor(private _http: HttpClient) { }
  getFavoritos(usuarioId : string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getFavoritos/`+usuarioId, httpOptions);
  }
  putFavoritos(favorito: Favorito): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`${this.apiUrl}/putFavorito/`+favorito._id, favorito,httpOptions);
  }
}
