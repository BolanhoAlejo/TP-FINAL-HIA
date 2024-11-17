import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { AuthService } from '../../services/auth/auth.service';
import { Producto } from '../../models/producto/producto';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  usuario: Usuario | null = null;

  constructor(private authService: AuthService,
    private favoritoService : FavoritoService
  ) {}
  favoritosPorUsuario : Producto[] = this.favoritoService.favoritosPorUsuario;
  ngOnInit() {
    this.usuario = this.authService.getUser();
    console.log(this.usuario);
  }

}
