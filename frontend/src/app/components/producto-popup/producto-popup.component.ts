import { Component } from '@angular/core';
import {ProductoService} from "../../services/producto/producto.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-producto-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto-popup.component.html',
  styleUrl: './producto-popup.component.scss'
})
export class ProductoPopupComponent {
  constructor(private productoService: ProductoService) {}
  protected producto = this.productoService.popUpProducto;
}
