import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto/producto';
import { AcortadorPipe } from '../../pipes/acortador.pipe';
@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    RouterLink, FormsModule, CommonModule,AcortadorPipe
  ],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent {
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
}
