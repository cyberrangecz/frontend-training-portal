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
 * Route guard determining if user is signed in and has role of a designer.
 */
export class TrainingDesignerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authGuard: SentinelAuthGuardWithLogin,
    private authService: SentinelAuthService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate()).pipe(
      map((canActivate) => (canActivate ? this.isDesigner() : false))
    );
  }

  private isDesigner(): boolean {
    if (RoleResolver.isTrainingDesigner(this.authService.getRoles())) {
      return true;
    }
    this.router.navigate([HOME_PATH]);
    return false;
  }
}
