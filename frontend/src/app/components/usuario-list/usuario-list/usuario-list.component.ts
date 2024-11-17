import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario/usuario.service';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent implements OnInit{
  usuarios: any[] = [];
  error: string = '';
  filterId: string = '';

  constructor(private usuarioService: UsuarioService) {
    
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
  this.usuarioService.getAll().subscribe(
    (data) => {
      this.usuarios = data;
    },
    (error) => {
      console.error('Error al obtener los usuarios', error);
    }
  );
}

getUsuarioById() {
  if (!this.filterId) {
    this.error = 'El ID del usuario no puede estar vacío';
    return;
  }

  this.usuarioService.getUsuarioById(this.filterId).subscribe(
    data => {
      if (data) {
        this.usuarios = [data];
        this.error = '';
      } else {
        this.usuarios = [];
        this.error = 'No se encontró ningún usuario con el ID proporcionado';
      }
    },
    err => {
      this.error = 'Error al recuperar empleado por id';
      this.usuarios = [];
    }
  );
}
deleteUsuario(usuId: any) {
  this.usuarioService.deleteUsuario(usuId).subscribe(
    () => {
      this.usuarios = this.usuarios.filter(usuario => usuario._id !== usuId);
      this.error = '';
    },
    err => {
      this.error = 'Error al eliminar el usuario';
    }
  );
}
}
