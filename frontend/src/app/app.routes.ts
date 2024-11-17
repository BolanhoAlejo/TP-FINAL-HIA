import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list/empleado-list.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form/empleado-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoDeleteComponent } from './components/producto-delete/producto-delete.component';
import { ProductoPopupComponent } from './components/producto-popup/producto-popup.component';
import { ProductoUpdateFormComponent } from './components/producto-update-form/producto-update-form.component';
import { PromocionListComponent } from './components/promocion-list/promocion-list.component';
import { PromocionFormComponent } from './components/promocion-form/promocion-form.component';
import { PromocionPopupComponent } from './components/promocion-popup/promocion-popup.component';
import { PromocionUpdateFormComponent } from './components/promocion-update-form/promocion-update-form.component';
import { PromocionDeleteComponent } from './components/promocion-delete/promocion-delete.component';
import { PublicComponent } from './components/public/public.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list/usuario-list.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { ChartComponent } from './components/chart/chart.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginResolve } from './services/login/login.resolve';
import { ProductosClienteComponent } from './components/productos-cliente/productos-cliente.component';
import { AuthGuard } from './services/auth/auth.guard';
import { EmpleadoGuard } from './services/auth/empleado-auth.guard';
import { AdminGuard } from './services/auth/admin.guard';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { PagoRechazadoComponent } from './components/pago-rechazado/pago-rechazado.component';


export const routes: Routes = [
  { path: "clienteList",
		component: ClienteListComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "usuarioList", 
		component: UsuarioListComponent,
		canActivate: [EmpleadoGuard],
	},

  { path: "usuarioForm",
		component: UsuarioFormComponent,
		canActivate: [AdminGuard],
	},
  { path: "usuarioForm/:_id", 
		component: UsuarioFormComponent,
		canActivate: [AdminGuard],
	},

  { path: "empleadoList", 
		component: EmpleadoListComponent,
		canActivate: [AdminGuard]
	},

  { path: "productoList", component: ProductoListComponent },
  { path: "clienteForm", 
		component: ClienteFormComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "clienteForm/:_id", 
		component: ClienteFormComponent,
		canActivate: [EmpleadoGuard]
	}, 
  { path: "empleadoForm", 
		component: EmpleadoFormComponent,
		canActivate: [AdminGuard],
	},  
  { path: "empleadoForm/:_id", 
		component: EmpleadoFormComponent,
		canActivate: [AdminGuard],
	},
  { path: "productoForm", 
		component: ProductoFormComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "promocionForm", 
		component: PromocionFormComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "login", 
		component: LoginComponent, 
		resolve: { 
			ready: LoginResolve,
		}
	},
  { path: "register",
		component: RegisterFormComponent,
		resolve: {
			ready: LoginResolve,
		}
	},

  { path: "productoUpdateForm", 
		component: ProductoUpdateFormComponent,
		canActivate: [EmpleadoGuard]
	},
  { path: "promocionUpdateForm",
		component: PromocionUpdateFormComponent,
		canActivate: [EmpleadoGuard]
	},
  { path: "promocionList", 
		component: PromocionListComponent,
		canActivate: [EmpleadoGuard]
	},
  { path: "productoDelete", 
		component: ProductoDeleteComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "promocionDelete", 
		component: PromocionDeleteComponent,
		canActivate: [EmpleadoGuard],
	},
  { path: "productoPopUp", component: ProductoPopupComponent},
  { path: "promocionPopUp", component: PromocionPopupComponent},

  { path: "facebook",
		component: PublicComponent,
		canActivate: [EmpleadoGuard],
	},

  { path: "home",
		component: HomeComponent
	},
  { path: "perfil", 
		component: PerfilComponent,
		canActivate: [AuthGuard],
	},
  { path: "productosVenta", component: ProductosClienteComponent},
  { path:"graficos", 
		component: ChartComponent,
		canActivate: [EmpleadoGuard],
	},
	{ path: "exito",
		component: PagoExitosoComponent
	},
	{ path: "rechazado",
		component: PagoRechazadoComponent
	},
  { path: "", redirectTo: "home", pathMatch: "full" }
];
