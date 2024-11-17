import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario/usuario';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
	public usuarioForm: FormGroup;


	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private activatedRoute:  ActivatedRoute,
		private router: Router
	) {
		this.usuarioForm = this.fb.group({
			email: ['', Validators.required],
			contrasenia: ['', Validators.required]
		});
	}

	login() {
		if(this.usuarioForm.invalid) {
			console.log("Invalid Data");
			return;
		}
		const usuario = this.usuarioForm.value;
		this.authService.login(usuario); 
	}
}
