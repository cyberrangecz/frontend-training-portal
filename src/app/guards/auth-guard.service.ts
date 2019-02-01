import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
/**
 * Guard which determines if user is signed in and can access private resources.
 */
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: ActiveUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated()) {
      if (this.userService.isTrainee() && !this.userService.isDesigner() && !this.userService.isOrganizer()) {
        this.router.navigate(['trainee']);
      }
      return true;
    }
    this.router.navigate(['login']);
  }
}
