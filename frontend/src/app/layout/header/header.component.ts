import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/usuario/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario | null = null;
  protected authService: AuthService = inject(AuthService);

  constructor() {}

  ngOnInit() {
    this.usuario = this.authService.getUser();
  }

  isEmpleado(): boolean {
    return this.usuario?.rol === 'empleado';
  }

  isAdmin(): boolean {
    return this.usuario?.rol === 'admin';
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
