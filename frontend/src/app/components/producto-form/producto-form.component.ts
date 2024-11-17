import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto/producto';

declare var bootstrap: any;

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent {
  private router = inject(Router);
  private productoService = inject(ProductoService);
  mensaje : string = '';
  titulo: string = '';

  newProductoForm = new FormGroup({
    codProducto: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  get codProducto() { return this.newProductoForm.get('codProducto'); }
  get nombre() { return this.newProductoForm.get('nombre'); }
  get descripcion() { return this.newProductoForm.get('descripcion'); }
  get imagen() { return this.newProductoForm.get('imagen'); }
  get precio() { return this.newProductoForm.get('precio'); }
  get stock() { return this.newProductoForm.get('stock'); }

  volver(): void {
    this.router.navigate(['/productoList']);
  }

  saveProducto(): void {
    if (this.newProductoForm.valid) {
      const nuevoProducto: Producto = {
        codProducto: Number(this.codProducto?.value),
        nombre: this.nombre!.value!,
        descripcion: this.descripcion!.value ?? '',
        imagenURL: this.imagen!.value ?? '',
        precio: Number(this.precio?.value),
        stock: Number(this.stock?.value),
      };
  
      this.productoService.createProducto(nuevoProducto).subscribe({
        next: (res) => {
          console.log('Respuesta del servidor:', res);
          if (res.status === "1") {
            this.titulo = "Producto agregado"
            this.mensaje = 'Producto creado exitosamente';
            var myModal = new bootstrap.Modal(document.getElementById('modal'));
            myModal.show();
          } else {
            console.error('Respuesta del servidor indica error:', res);
          }
        },
        error: (err) => {
          this.titulo = "Error"
          this.mensaje = 'Error al crear el producto: '+err["error"].msg;
          var myModal = new bootstrap.Modal(document.getElementById('modal'));
          myModal.show();
          console.error('Error de la solicitud HTTP:', err.error.msg);
        }
      });
    }
  }
}
