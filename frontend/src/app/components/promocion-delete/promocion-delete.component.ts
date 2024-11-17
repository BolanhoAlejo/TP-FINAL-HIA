import { Component, inject } from '@angular/core';
import { PromocionService } from '../../services/promocion/promocion.service';
import { Router } from '@angular/router';
import { Promocion } from '../../models/promocion/promocion';

@Component({
  selector: 'app-promocion-delete',
  standalone: true,
  imports: [],
  templateUrl: './promocion-delete.component.html',
  styleUrl: './promocion-delete.component.scss'
})
export class PromocionDeleteComponent {
  private promocionService: PromocionService = inject(PromocionService);
  private router: Router = inject(Router);
  promocionEliminar = this.promocionService.promocionEliminar;
  deletePromocion(promocion: Promocion) {
    this.promocionService.deletePromocion(promocion).subscribe((res: any) => {
      console.log(res);
      alert('Promocion eliminada');
      this.router.navigate(['/promocionList'])
      this.promocionService.getPromocion();
    }, (err) => {
      console.log(err);
      alert('Error al eliminar la promocion');
      this.router.navigate(['/promocionList'])
    });
  }
  cancelar() {
    this.promocionService.promocionEliminar = new Promocion();
    this.router.navigate(['/promocionList'])
  }
}
