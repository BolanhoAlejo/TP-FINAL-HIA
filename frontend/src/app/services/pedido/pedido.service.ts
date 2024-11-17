import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../../models/pedido/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/v1/pedido'; // URL base de la API
  createPedido(pedido: Pedido ): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("En el service "+pedido.detalles);
    return this._http.post(`${this.apiUrl}/postPedido`, pedido, httpOptions);
  }
	getPedido(pedidoId: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getPedido/${pedidoId}`, httpOptions);
	}
}
