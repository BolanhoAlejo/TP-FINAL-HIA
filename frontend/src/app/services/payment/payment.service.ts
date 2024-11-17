import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto/producto';
import { Pedido } from '../../models/pedido/pedido';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/v1/payment'; // URL base de la API

  constructor(private http: HttpClient) {}
	
	generateMercadoPagoLink(pedido: Pedido) { 
		let paymentUrl = `${this.apiUrl}/payment`;
		return this.http.post<any>(paymentUrl, pedido);
	}

}
