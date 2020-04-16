import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TRAINING_RUN_PATH } from 'kypo-training-agenda';
import { Kypo2AuthGuardWithLogin, Kypo2AuthService } from 'kypo2-auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleResolver } from '../../utils/role-resolver';
import { LoadingService } from '../shared/loading.service';
import { CanActivateToObservable } from './can-activate-to-observable';

/**
 * Route guard determining if user is signed in and has ONLY role of a trainee.
 * If true, user is navigated directly to trainee agenda instead of the homepage
 */
@Injectable()
export class OnlyTraineeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authGuard: Kypo2AuthGuardWithLogin,
    private loadingService: LoadingService,
    private authService: Kypo2AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state)).pipe(
      map((canActivate) => (canActivate ? this.isTraineeOnly() : false))
    );
  }

  private isTraineeOnly(): boolean {
    const roles = this.authService.getRoles();
    if (
      RoleResolver.isTrainingTrainee(roles) &&
      !RoleResolver.isTrainingOrganizer(roles) &&
      !RoleResolver.isTrainingDesigner(roles) &&
      !RoleResolver.isUserAndGroupAdmin(roles)
    ) {
      this.router.navigate([TRAINING_RUN_PATH]);
      return false;
    }
    return true;
  }
}
