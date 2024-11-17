import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto/producto';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-producto-delete',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './producto-delete.component.html',
  styleUrl: './producto-delete.component.scss'
})
export class ProductoDeleteComponent {

  private productoService: ProductoService = inject(ProductoService);
  private router: Router = inject(Router);
  mensaje : string = '';
  titulo: string = '';
  productoEliminar = this.productoService.productoEliminar;
  deleteProducto(producto: Producto) {
    this.productoService.deleteProducto(producto).subscribe({
      next: () => {
        this.titulo = "Producto eliminado";
        this.mensaje = 'Producto eliminado exitosamente';
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.show();
        this.productoService.getProducto();
      },
      error: (err) => {
        console.log(err);
        this.titulo = "Error";
        this.mensaje = 'Error al eliminar el producto';
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.show();
      }
    });
  }
  cancelar() {
    this.productoService.productoEliminar = new Producto();
    this.router.navigate(['/productoList'])
  }
  volver(): void {
    this.router.navigate(['/productoList']);
  }
}
