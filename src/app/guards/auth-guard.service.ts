import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";
import {UserRoleEnum} from "../enums/user-role.enum";

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
      if (this.userService.getActiveUser().roles.contains(UserRoleEnum.Trainee) && this.userService.getActiveUser().roles.size() === 1) {
        this.router.navigate(['trainee']);
      }
      return true;
    }
    this.router.navigate(['login']);
  }
}
