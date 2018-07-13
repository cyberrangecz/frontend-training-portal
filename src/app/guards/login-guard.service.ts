import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
