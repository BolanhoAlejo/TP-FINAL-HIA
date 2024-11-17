import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ClienteService } from "../../services/cliente/cliente.service";
import { Cliente } from "../../models/cliente/cliente";
import { error } from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  error: string = '';
  filterId: string = '';

  constructor (private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getAll();
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

  getClienteById() {
    if (!this.filterId) {
      this.error = 'El ID del cliente no puede estar vacio. ';
      return;
    }

    this.clienteService.getClienteById(this.filterId).subscribe(
      data => {
        if (data) {
          this.clientes = [data];
          this.error = '';
        } else {
          this.clientes = [];
          this.error = 'No se encontro ningun cliente con el ID proporcionado. ';
        }
      }, err => {
        this.error = 'Error al recuperar cliente por id. ';
        this.clientes = [];
      }
    );
  }

  deleteCliente(cliId: any) {
    this.clienteService.deleteCliente(cliId).subscribe(
      () => {
        this.clientes = this.clientes.filter(cliente => cliente._id !== cliId);
        this.error = '';
      }, err => {
        this.error = 'Error al eliminar el cliente. ';
      }
    );
  }
}