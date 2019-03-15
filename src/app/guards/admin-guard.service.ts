import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthGuard} from './auth-guard.service';
import {ActiveUserService} from '../services/active-user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private userService: ActiveUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authResultPromise = this.authGuard.canActivate(route, state) as Promise<boolean>;
    return authResultPromise
      .then(authenticated => {
        if (authenticated && this.userService.isAdmin()) {
          return true;
        }
        this.router.navigate(['home']);
        return false;
      });
  }

}
