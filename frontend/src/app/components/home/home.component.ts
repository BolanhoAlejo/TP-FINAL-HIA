import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../models/producto/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { AcortadorPipe } from '../../pipes/acortador.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule,AcortadorPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productos = new Array<Producto>();

  constructor(private productoService: ProductoService) {
    this.getProducto();
  }

  getProducto() {
    this.productoService.getProducto().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productos = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  popUpProducto(p: Producto) {
    this.productoService.sendPopUpProducto(p);
  }

  cargarProductoModificar(p: Producto) {
    this.productoService.productoModificar = p;
  }

  eliminarProducto(p: Producto) {
    this.productoService.productoEliminar = p;
  }

  chunkArray(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

}
