import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { EmpleadoService } from "../../../services/empleado/empleado.service";
@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.scss'
})
export class EmpleadoListComponent implements OnInit {
  empleados: any[] = [];
  error: string = '';
  filterId: string = '';

  constructor (private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getAll();
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

  getEmpleadoById() {
    if (!this.filterId) {
      this.error = 'El ID del empleado no puede estar vacio. ';
      return;
    }

    this.empleadoService.getEmpleadoById(this.filterId).subscribe(
      data => {
        if (data) {
          this.empleados = [data];
          this.error = '';
        } else {
          this.empleados = [];
          this.error = 'No se encontro ningun empleado con el ID proporcionado. ';
        }
      }, err => {
        this.error = 'Error al recuperar empleado por id. ';
        this.empleados = [];
      }
    );
  }

  deleteEmpleado(empId: any) {
    this.empleadoService.deleteEmpleado(empId).subscribe(
      () => {
        this.empleados = this.empleados.filter(empleado => empleado._id !== empId);
        this.error = '';
      }, err => {
        this.error = 'Error al eliminar el empleado. ';
      }
    );
  }
}
