import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/internal/Observable";
import {UserRolesEnum} from "../enums/user-roles.enum";

@Injectable()
export class DesignerGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated() && this.userService.getUserRole().contains(UserRolesEnum.Designer)) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
