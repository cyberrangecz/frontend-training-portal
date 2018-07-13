import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {UserService} from "../services/user.service";
import {UserRolesEnum} from "../enums/user-roles.enum";

@Injectable()
export class OrganizerGuard implements CanActivate {


  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated() && this.userService.getUserRole().contains(UserRolesEnum.Organizer)) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }

}
