import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ClienteService } from "../../services/cliente/cliente.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = [];
  error: string = '';
  cliente: any;
  success: string = '';
  isEditing: boolean = false;
  clienteIdToEdit: any;

  constructor (
    private fb: FormBuilder, 
    private clienteService: ClienteService,
    private activedroute: ActivatedRoute
  ) {
    this.clienteIdToEdit = activedroute.snapshot.params['_id'];
    this.clienteForm = this.fb.group({
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

    if (this.clienteIdToEdit) {
      this.isEditing = true;
      this.clienteService.getClienteById(this.clienteIdToEdit).subscribe(
        data => {
          if (data) {
            this.clienteForm.patchValue(data);
            this.error = '';
          } else {
            this.error = 'No se encontro ningun cliente con el ID proporcionado. ';
          }
        }, err => {
          this.error = 'Error al recuperar empleado por ID. '
        }
      );
    }
  }

  getAll() {
    this.clienteService.getAll().subscribe(
      (data) => {
        this.clientes = data;
      }, (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  submitForm() {
    if (this.clienteForm.invalid) {
      this.error = 'Todos los campos son obligatorios. ';
      return;
    }

    const clienteData = this.clienteForm.value;
    if (this.isEditing && this.clienteIdToEdit !== null) {
      clienteData._id = this.clienteIdToEdit;
      this.clienteService.updateCliente(clienteData).subscribe(
        () => {
          this.success = 'Cliente actualizado exitosamente. ';
          this.error = '';
          this.resetForm();
        }, err => {
          this.error = 'Error al actualizar el cliente. ';
          this.success = '';
        }
      );
    } else {
      this.clienteService.postCliente(clienteData).subscribe(
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
    this.clienteForm.reset();
    this.isEditing = false;
    this.clienteIdToEdit = null;
  }
}