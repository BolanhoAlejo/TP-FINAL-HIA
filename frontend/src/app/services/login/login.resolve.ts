import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Observable, map } from "rxjs";

@Injectable(
	{
		providedIn: 'root'
	}
)
export class LoginResolve implements Resolve<boolean> {
	constructor(private authState: AuthService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		// listen to state changes
		return this.authState.stateItem$.pipe(
			// if item exists redirect to default
			// later we will enhance this with a redirect url
			map((user:any) => {
				if (user) {
					this.router.navigateByUrl('/');
				}
				// does not really matter, I either go in or navigate away
				return true;
			})
		);
	}
}
