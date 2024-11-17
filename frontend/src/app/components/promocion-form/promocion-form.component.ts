import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PromocionService } from '../../services/promocion/promocion.service';
import { ProductoService } from '../../services/producto/producto.service';
import { Promocion } from '../../models/promocion/promocion';
import { Producto } from '../../models/producto/producto';

declare var bootstrap: any;

@Component({
  selector: 'app-promocion-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './promocion-form.component.html',
  styleUrls: ['./promocion-form.component.scss']
})
export class PromocionFormComponent {
  private router = inject(Router);
  private promocionService = inject(PromocionService);
  private productoService = inject(ProductoService);
  mensaje: string = '';
  titulo: string = '';
  mostrarListaPromociones: boolean = true;

  public productos: Producto[] = [];
  public codigosProductos: Map<string, number> = new Map();
  promocion: Promocion = new Promocion();

  newPromocionForm = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl('', Validators.required),
    descuento: new FormControl('', Validators.required),
    productoSeleccionado: new FormControl('')
  });

  get descripcion() { return this.newPromocionForm.get('descripcion'); }
  get fechaInicio() { return this.newPromocionForm.get('fechaInicio'); }
  get fechaFin() { return this.newPromocionForm.get('fechaFin'); }
  get descuento() { return this.newPromocionForm.get('descuento'); }
  get productoSeleccionado() { return this.newPromocionForm.get('productoSeleccionado'); }

  constructor() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProducto().subscribe({
      next: (res: any) => {
        this.productos = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  createPromocion() {
    if (this.newPromocionForm.valid) {
      this.promocion.descripcion = this.descripcion?.value || '';
      this.promocion.fechaInicio = this.fechaInicio?.value || '';
      this.promocion.fechaFin = this.fechaFin?.value || '';
      this.promocion.descuento = Number(this.descuento?.value);

      this.promocionService.createPromocion(this.promocion).subscribe({
        next: (res: any) => {
          console.log(res);
          this.titulo = 'Promocion agregada';
          this.mensaje = 'Promocion creada exitosamente';
          var myModal = new bootstrap.Modal(document.getElementById('modal'));
          myModal.show();
          this.newPromocionForm.reset();
          this.promocion.productos = [];
          this.codigosProductos.clear();
        },
        error: (err: any) => {
          console.error(err);
          this.titulo = 'Error';
          this.mensaje = 'Error al crear la promocion: ' + err.error.msg;
          var myModal = new bootstrap.Modal(document.getElementById('modal'));
          myModal.show();
        }
      });
    }
  }

  agregarProductoPromocion() {
    const productoId = this.productoSeleccionado?.value as string;
    if (!productoId) return;
  
    // Verificar si el producto ya está agregado en la promoción actual
    if (this.promocion.productos.includes(productoId)) {
      this.mostrarListaPromociones = false;
      this.mostrarError('Producto ya agregado');
      return;
    }
  
    // Verificar si el producto ya está en otra promoción
    this.buscarProductoEnOtrasPromociones(productoId);
  }
  
  buscarProductoEnOtrasPromociones(productoId: string) {
    this.productoService.getProductoById(productoId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.promocion !== null) {
          this.mostrarListaPromociones = false;
          this.mostrarError('El producto ya se encuentra en otra promoción');
        } else {
          // Agregar producto a la promoción si no está en otra promoción
          this.agregarProductoALaPromocion(productoId);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  agregarProductoALaPromocion(productoId: string) {
    const producto = this.productos.find(p => p._id === productoId);
    if (producto && producto._id) {
      this.promocion.productos.push(producto._id);
      this.codigosProductos.set(producto._id, producto.codProducto || 0);
      this.mostrarListaPromociones = true; // Mostrar el botón de lista de promociones
    }
  }
  
  mostrarError(mensaje: string) {
    this.titulo = 'Error';
    this.mensaje = mensaje;
    var myModal = new bootstrap.Modal(document.getElementById('modal'));
    myModal.show();
    this.mostrarListaPromociones = false; // Esconder el botón de lista de promociones
  }

  cancelar(productoId: string) {
    this.promocion.productos = this.promocion.productos.filter(id => id !== productoId);
    this.codigosProductos.delete(productoId);
  }

  volver(): void {
    this.router.navigate(['/promocionList']);
  }
}
