import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario/usuario';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register-form',
	standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './register-form.component.html',
	styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
	public usuario: Usuario;
  public usuarioForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.usuario = {}
		this.usuarioForm = this.fb.group({
			nombre: ['', Validators.required],
			apellido: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			telefono: ['', Validators.required],
			nombreUsuario: ['', Validators.required],
			contrasenia: ['', Validators.required],
			rol: ['cliente', Validators.required]
		});
	}

	submitRegister() {
		if(this.usuarioForm.invalid) {
			console.log("Invalid Data")
			return;	
		}
		const usuario = this.usuarioForm.value;
		console.log("Usuario")
		console.log(usuario);
		this.authService.register(usuario).subscribe(
			(usuario) => {
				// do something with returned user data and access token cookie
				// set rxjs or some global state and triggers user
				console.log("registered correctly")
				alert("Usuario registrado exitosamente")
				this.router.navigateByUrl("/login")
			},
			(error) => {
				console.error(error);
				alert("Hubo un problema en tu registro :(")
			}
		)
		
	}

	
}
