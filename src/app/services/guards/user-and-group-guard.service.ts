import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin } from '@sentinel/auth/guards';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOME_PATH } from '../../paths';
import { RoleResolver } from '../../utils/role-resolver';
import { CanActivateToObservable } from './can-activate-to-observable';

@Injectable()
/**
 * Route guard determining if user is signed in and has role of an admin.
 */
export class UserAndGroupGuard {
  constructor(
    private router: Router,
    private authGuard: SentinelAuthGuardWithLogin,
    private authService: SentinelAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate()).pipe(
      map((canActivate) => (canActivate ? this.isAdmin() : false))
    );
  }

  private isAdmin(): boolean {
    if (RoleResolver.isUserAndGroupAdmin(this.authService.getRoles())) {
      return true;
    }
    this.router.navigate([HOME_PATH]);
    return false;
  }
}
