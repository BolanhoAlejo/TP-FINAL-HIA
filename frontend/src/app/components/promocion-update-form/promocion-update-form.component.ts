import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PromocionService } from '../../services/promocion/promocion.service';
import { Producto } from '../../models/producto/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { Promocion } from '../../models/promocion/promocion';

@Component({
  selector: 'app-promocion-update-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './promocion-update-form.component.html',
  styleUrl: './promocion-update-form.component.scss'
})
export class PromocionUpdateFormComponent {
  public productos = new Array<Producto>
  public codigosProductos: Map<string, number> = new Map();
  private promocionService: PromocionService = inject(PromocionService);
  private productoService: ProductoService = inject(ProductoService);
  promocion : any
  promocionId : string
  
  constructor() {
    this.promocionId = this.promocionService.promocionModificar || '';
  }

  ngOnInit() {
    this.getProductos();
    this.precargarPromocion();
  }

  getProductos(){
    this.productoService.getProducto().subscribe((res: any) => {
      this.productos = res;
    }, (err) => {
      console.log(err);
    });
  }

  updatePromocion() {
    this.promocionService.updatePromocion(this.promocion).subscribe(
      (res) => {
        console.log(res);
        alert('Promocion actualizada correctamente');
      },
      (err) => {
        console.log(err);
        alert('Error al actualizar la promocion');
      }
    );
  }

  precargarPromocion(){
/*     this.promocion.productos.forEach(element => {
      this.productoService.getProductoById(element).subscribe((res) => {
        console.log(res.codProducto || 0 );
        this.codigosProductos.set(element, res.codProducto || 0);
      });
    }); */
    this.promocionService.getPromocionById(this.promocionId).subscribe((res) => {
      console.log(res);
      this.promocion = res;
    });

  }

  cancelar(productoId: string, promocion: Promocion) {
    console.log("Cancelando el producto " + productoId);
    if (productoId) {
      promocion.productos = promocion.productos?.filter((producto) => producto !== productoId);
      this.codigosProductos.delete(productoId);
    }
  }

  agregarProductoPromocion(producto: Producto) {
    console.log("Agregando el producto "+producto._id)
    if (producto._id) {
        this.promocion.productos?.push(producto._id);
        this.codigosProductos.set(producto._id, producto.codProducto || 0);
        console.log(this.promocion.productos.length);
    }
  }
}
