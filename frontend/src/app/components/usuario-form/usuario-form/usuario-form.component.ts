import { Component , OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  usuarios: any[] = [];
  error: string = '';
  usuario: any;
  success: string = '';
  isEditing: boolean = false;
  usuarioIdToEdit: any;
  
  constructor (
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private activedroute: ActivatedRoute
  ) {
    this.usuarioIdToEdit = activedroute.snapshot.params['_id'];
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAll();

    if (this.usuarioIdToEdit) {
      this.isEditing = true;
      this.usuarioService.getUsuarioById(this.usuarioIdToEdit).subscribe(
        data => {
          if (data) {
            this.usuarioForm.patchValue(data);
            this.error = '';
          } else {
            this.error = 'No se encontro ningun usuario con el ID proporcionado. ';
          }
        }, err => {
          this.error = 'Error al recuperar usuario por ID. '
        }
      );
    }
  }
  getAll() {
    this.usuarioService.getAll().subscribe(
      (data) => {
        this.usuarios = data;
      }, (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
  submitForm() {
    if (this.usuarioForm.invalid) {
      this.error = 'Todos los campos son obligatorios. ';
      return;
    }

    const usuarioData = this.usuarioForm.value;
    if (this.isEditing && this.usuarioIdToEdit !== null) {
      usuarioData._id = this.usuarioIdToEdit;
      this.usuarioService.updateUsuario(this.usuarioIdToEdit, usuarioData).subscribe(
        () => {
          this.success = 'Usuario actualizado exitosamente. ';
          this.error = '';
          this.resetForm();
        }, err => {
          this.error = 'Error al actualizar el usuario. ';
          this.success = '';
        }
      );
    } else {
      this.usuarioService.postUsuario(usuarioData).subscribe(
        () => {
          this.success = 'Cliente agregado exitosamente. ';
          this.error = '';
          this.resetForm();
        }, err => {
          this.error = err[0];
          this.success = '';
        }
      );
    }
  }

  resetForm() {
    this.usuarioForm.reset();
    this.isEditing = false;
    this.usuarioIdToEdit = null;
  }
}
