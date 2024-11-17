import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/v1/producto'; // URL base de la API
  popUpProducto = new Producto();
  productoModificar = new Producto();
  productoEliminar = new Producto();

  constructor(private _http: HttpClient) {}

  getProducto(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getProductos`, httpOptions);
  }

  createProducto(producto: Producto): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(producto)
    return this._http.post(`${this.apiUrl}/postProducto`, producto, httpOptions);
  }

  sendPopUpProducto(p: Producto) {
    this.popUpProducto = p;
  }

  updateProducto(p: Producto): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(p)
    return this._http.put(`${this.apiUrl}/putProducto/`+p._id, p, httpOptions);
  }

  deleteProducto(producto: Producto): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.delete(`${this.apiUrl}/deleteProducto/`+producto._id, httpOptions);
  }

  getProductoById(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.apiUrl}/getProducto/`+id, httpOptions);
  }
}
