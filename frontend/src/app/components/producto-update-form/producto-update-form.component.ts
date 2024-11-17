import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto/producto';

declare var bootstrap: any;

@Component({
  selector: 'app-producto-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './producto-update-form.component.html',
  styleUrls: ['./producto-update-form.component.scss']
})
export class ProductoUpdateFormComponent {

  mensaje : string = '';
  titulo: string = '';

  private router = inject(Router);
  private productoService = inject(ProductoService);

  productoForm = new FormGroup({
    _id: new FormControl('', Validators.required), // Agregar campo _id al formulario
    codProducto: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagenURL: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  });

  constructor() {
    const productoModificar = this.productoService.productoModificar;
    this.productoForm.setValue({
      _id: productoModificar._id ?? null, // Asignar _id del producto
      codProducto: String(productoModificar.codProducto),
      nombre: productoModificar.nombre ?? '',
      descripcion: productoModificar.descripcion ?? '',
      imagenURL: productoModificar.imagenURL ?? '',
      precio: String(productoModificar.precio) ?? '',
      stock: String(productoModificar.stock) ?? ''
    });
  }

  get _id() { return this.productoForm.get('_id'); } // Obtener el control del _id del formulario
  get codProducto() { return this.productoForm.get('codProducto'); }
  get nombre() { return this.productoForm.get('nombre'); }
  get descripcion() { return this.productoForm.get('descripcion'); }
  get imagenURL() { return this.productoForm.get('imagenURL'); }
  get precio() { return this.productoForm.get('precio'); }
  get stock() { return this.productoForm.get('stock'); }

  volver(): void {
    this.router.navigate(['/productoList']);
  }

  updateProducto(): void {
    if (this.productoForm.valid) {
      const productoActualizado: Producto = {
        _id: this._id?.value ?? '',
        codProducto: Number(this.codProducto?.value),
        nombre: this.nombre!.value!,
        descripcion: this.descripcion!.value ?? '',
        imagenURL: this.imagenURL!.value ?? '',
        precio: Number(this.precio?.value),
        stock: Number(this.stock?.value)
      };
      this.productoService.updateProducto(productoActualizado).subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res);
          if (res.status === "1") {
            this.titulo = "Producto actualizado"
            this.mensaje = 'Producto actualizado exitosamente';
            var myModal = new bootstrap.Modal(document.getElementById('modal'));
            myModal.show();
          } else {
            alert('Error al actualizar el producto');
            console.error('Respuesta del servidor indica error:', res);
          }
        },
        error: (err) => {
          this.titulo = "Error"
          this.mensaje = 'Error al crear el producto: '+err["error"].msg;
          var myModal = new bootstrap.Modal(document.getElementById('modal'));
          myModal.show();
        }
      });
    } else {
      alert('Formulario no válido. Por favor, complete todos los campos requeridos.');
    }
  }
}
