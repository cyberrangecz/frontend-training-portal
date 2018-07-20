import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../services/active-user.service";

@Injectable()
/**
 * Guard which determines if user is signed in and has role of trainee.
 */
export class TraineeGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: ActiveUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated() && this.userService.isTrainee()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }

}
