import { Injectable } from '@angular/core';
import { Promocion } from '../../models/promocion/promocion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private apiUrl = 'http://localhost:3000/api/v1/promocion'; // URL base de la API
  popUpPromocion = new Promocion();
  promocionModificar? : string ;
  promocionEliminar = new Promocion();
  constructor(private _http: HttpClient) { }
  getPromocion(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getPromociones`, httpOptions);
  }
  createPromocion(p: Promocion) : Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`${this.apiUrl}/postPromocion`,p, httpOptions);
  }
  sendPopUpPromocion(p: Promocion) {
    this.popUpPromocion = p;
  }
  updatePromocion(p: Promocion) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`${this.apiUrl}/putPromocion/`+p._id, p, httpOptions);
  }
  deletePromocion(promocion: Promocion) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete(`${this.apiUrl}/deletePromocion/`+promocion._id, httpOptions);
  }
  getPromocionById(id: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getPromocion/`+id, httpOptions);
  }
}
