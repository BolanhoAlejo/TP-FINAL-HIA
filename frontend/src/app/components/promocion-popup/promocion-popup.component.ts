import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromocionService } from '../../services/promocion/promocion.service';

@Component({
  selector: 'app-promocion-popup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './promocion-popup.component.html',
  styleUrl: './promocion-popup.component.scss'
})
export class PromocionPopupComponent {
  private promocionService : PromocionService = inject(PromocionService);
  protected promocion = this.promocionService.popUpPromocion;
}
