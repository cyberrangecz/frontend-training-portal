import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { SentinelAuthGuardWithLogin } from '@sentinel/auth/guards';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HOME_PATH } from '../../paths';
import { RoleResolver } from '../../utils/role-resolver';
import { CanActivateToObservable } from './can-activate-to-observable';

@Injectable()
/**
 * Route guard determining if user is signed in and has role of an organizer.
 */
export class TrainingOrganizerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authGuard: SentinelAuthGuardWithLogin,
    private authService: SentinelAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state)).pipe(
      map((canActivate) => (canActivate ? this.isOrganizer() : false))
    );
  }

  private isOrganizer(): boolean {
    if (RoleResolver.isTrainingOrganizer(this.authService.getRoles())) {
      return true;
    }
    this.router.navigate([HOME_PATH]);
    return false;
  }
}
