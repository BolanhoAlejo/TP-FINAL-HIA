import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { EmpleadoService } from "../../../services/empleado/empleado.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.scss'
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  empleados: any[] = [];
  error: string = '';
  empleado: any;
  success: string = '';
  isEditing: boolean = false;
  empleadoIdToEdit: any;

  constructor (
    private fb: FormBuilder, 
    private empleadoService: EmpleadoService,
    private activedroute: ActivatedRoute
  ) {
    this.empleadoIdToEdit = activedroute.snapshot.params['_id'];
    this.empleadoForm = this.fb.group({
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

    if (this.empleadoIdToEdit) {
      this.isEditing = true;
      this.empleadoService.getEmpleadoById(this.empleadoIdToEdit).subscribe(
        data => {
          if (data) {
            this.empleadoForm.patchValue(data);
            this.error = '';
          } else {
            this.error = 'No se encontro ningun empleado con el ID proporcionado. ';
          }
        }, err => {
          this.error = 'Error al recuperar empleado por ID. '
        }
      );
    }
  }

  getAll() {
    this.empleadoService.getAll().subscribe(
      (data) => {
        this.empleados = data;
      }, (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  submitForm() {
    if (this.empleadoForm.invalid) {
      this.error = 'Todos los campos son obligatorios. ';
      return;
    }

    const empleadoData = this.empleadoForm.value;
    if (this.isEditing && this.empleadoIdToEdit !== null) {
      empleadoData._id = this.empleadoIdToEdit;
      this.empleadoService.updateEmpleado(empleadoData).subscribe(
        () => {
          this.success = 'Empleado actualizado exitosamente. ';
          this.error = '';
          this.resetForm();
        }, err => {
          this.error = 'Error al actualizar el empleado. ';
          this.success = '';
        }
      );
    } else {
      alert( 'Se enviara '+ empleadoData.nombre + ' ' + empleadoData.apellido)
      this.empleadoService.postEmpleado(empleadoData).subscribe(
        () => {
          alert(empleadoData.nombre + ' ' + empleadoData.apellido + ' ha sido agregado. ')
          this.success = 'Empleado agregado exitosamente. ';
          this.error = '';
          this.resetForm();
        }, err => {
          console.log(err[0])
          this.error = err[0];
          this.success = '';
        }
      );
    }
  }

  resetForm() {
    this.empleadoForm.reset();
    this.isEditing = false;
    this.empleadoIdToEdit = null;
  }
}
