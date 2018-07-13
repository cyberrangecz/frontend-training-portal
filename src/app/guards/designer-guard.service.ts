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
    if (this.userService.getUserRole().contains(UserRolesEnum.Trainee)) {
      return true;
    }
    this.router.navigate(['overview']);
    return false;
  }
}
