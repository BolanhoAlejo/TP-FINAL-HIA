import { Component, inject } from '@angular/core';
import {RouterLink} from "@angular/router";
import { Promocion } from '../../models/promocion/promocion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromocionService } from '../../services/promocion/promocion.service';
import { AcortadorPipe } from "../../pipes/acortador.pipe";

@Component({
  selector: 'app-promocion-list',
  standalone: true,
  imports: [
    RouterLink, CommonModule, FormsModule,
    AcortadorPipe
],
  templateUrl: './promocion-list.component.html',
  styleUrl: './promocion-list.component.scss'
})
export class PromocionListComponent {
  promociones = new Array<Promocion>();
  promocion = new Promocion();
  private promocionService: PromocionService = inject(PromocionService);
  constructor() {
    this.getPromocion();
  }

  darFormatoFecha(dateString: string | undefined): string {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
    return '';
  }

  getPromocion() {
    this.promocionService.getPromocion().subscribe((res: any) => {
      console.log(res);
      this.promociones = res;
    }, (err) => {
      console.log(err);
    });
  }

  popUpPromocion(p: Promocion) {
    this.promocionService.sendPopUpPromocion(p);
  }

  updatePromocion(p: Promocion) {
    this.promocionService.updatePromocion(p).subscribe((res: any) => {
      console.log(res);
      this.getPromocion();
    }, (err) => {
      console.log(err);
    });
  }

  cargarPromocionModificar(p: string) {
    this.promocionService.promocionModificar = p;
  }

  eliminarPromocion(p: Promocion) {
    this.promocionService.promocionEliminar = p;
  }
}
