import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, map, of } from 'rxjs'
import { Cliente } from '../../models/cliente/cliente';
import { Usuario } from '../../models/usuario/usuario';
import { Router } from '@angular/router';


const CheckAuth = (auth: any): boolean => {
  // TODO: Check access token cookie jwt
  return true;
};

export const authFactory = (authService: AuthService) => () => {
  const _localuser = JSON.parse(localStorage.getItem('usuario')!);

  if (CheckAuth(_localuser)) {
    authService.SetState(_localuser);
  } else {
    authService.RemoveState();
    localStorage.removeItem('usuario');
  }
};


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = 'http://localhost:3000/api/v1';
	private stateItem: BehaviorSubject<any | null> = new BehaviorSubject(null);
	stateItem$: Observable<Usuario | null> = this.stateItem.asObservable();

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	isLogged() {
  	const _localuser = JSON.parse(localStorage.getItem('usuario')!);
		if(_localuser) {
			return true;
		}
		return false;
	}

	getUser() {
  	const _localuser: Usuario = JSON.parse(localStorage.getItem('usuario')!) as Usuario;
		if(_localuser) {
			return _localuser;
		}
		return null;
	}

	login(usuario: any) {
		const loginUrl = `${this.apiUrl}/login`;
		this.http.post<any>(loginUrl, usuario, { withCredentials: true }).subscribe(
			(usuario) => {
				if(usuario.ok === 0) {
					console.log(usuario.message);
					// TODO: redirect to login with fails
					this.router.navigateByUrl("/login");
					return;
				}
				localStorage.setItem('usuario', JSON.stringify(usuario));
				this.stateItem.next(usuario);
				this.router.navigateByUrl("/");
				alert("inicio sesion")
				window.location.reload()
				console.log(usuario);
			},
			(error) => {
				// TODO: Error Handling
				console.log(error);
			}
		);
	}

	logout() {
		this.RemoveState();
		localStorage.removeItem('usuario');
		const logoutUrl = `${this.apiUrl}/logout`;
		return this.http.get<any>(logoutUrl).subscribe({
			next: res => {
				alert("cerrando sesion")
				window.location.reload()
			},
			error: err => {
				console.log(err);
			}
		});
	}
	register(usuario: Usuario) {
		const registerUrl = `${this.apiUrl}/register`;
		return this.http.post<any>(registerUrl, usuario, { withCredentials: true });
	}

	SetState(item: any) {
    this.stateItem.next(item);
  }
  RemoveState() {
    this.stateItem.next(null);
  }

}


