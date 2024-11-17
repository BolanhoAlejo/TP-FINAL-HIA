import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, map } from "rxjs";

// services/auth.guard
@Injectable({ providedIn: 'root' })
export class EmpleadoGuard implements CanActivate, CanActivateChild {
    // bring in our Auth future State
    constructor(private authState: AuthService, private _router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.secure(route);
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.secure(route);
    }
    private secure(route: ActivatedRouteSnapshot | Route): Observable<boolean> {
        // listen to auth state
      return this.authState.stateItem$.pipe(
         map(usuario => {
            // if user exists let them in, else redirect to login
            if (!usuario) {
               this._router.navigateByUrl('/login');
               return false;
            }
						if(usuario.rol != "empleado") {
              this._router.navigateByUrl('/');
							return false;
						}
            // user exists
            return true;
         })
      );
    }
}
