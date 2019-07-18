import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Kypo2AuthGuardWithLogin, Kypo2AuthService} from 'kypo2-auth';
import {CanActivateToObservable} from "./can-activate-to-observable";
import {map} from "rxjs/operators";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private authGuard: Kypo2AuthGuardWithLogin,
              private authService: Kypo2AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state))
      .pipe(
        map(canActivate => canActivate ? this.isAdmin() : false)
      );
  }

  private isAdmin(): boolean {
    if (this.authService.isUserAndGroupAdmin()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
