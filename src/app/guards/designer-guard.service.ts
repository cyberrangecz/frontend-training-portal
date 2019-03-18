import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";
import {AuthGuard} from "./auth-guard.service";

@Injectable()
/**
 * Guard which determines if user is signed in and has role of designer.
 */
export class DesignerGuard implements CanActivate {

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private userService: ActiveUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authResultPromise = this.authGuard.canActivate(route, state) as Promise<boolean>;
    return authResultPromise
      .then(authenticated => {
        if (authenticated && this.userService.isDesigner()) {
          return true;
        }
        this.router.navigate(['home']);
        return false;
      });
  }

}
