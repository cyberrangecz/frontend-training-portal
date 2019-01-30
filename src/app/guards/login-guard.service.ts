import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
/**
 * Guard which determines if user is NOT signed in and can access login page.
 */
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: ActiveUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
