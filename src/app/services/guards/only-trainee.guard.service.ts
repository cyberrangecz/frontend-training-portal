import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Kypo2AuthGuardWithLogin, Kypo2AuthService} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TRAINING_RUN_PATH} from '../../paths';
import {LoadingService} from '../shared/loading.service';
import {CanActivateToObservable} from './can-activate-to-observable';
import {RoleResolver} from '../../utils/role-resolver';

/**
 * Route guard determining if user is signed in and has ONLY role of a trainee.
 * If true, user is navigated directly to trainee agenda instead of the homepage
 */
@Injectable()
export class NotOnlyTraineeGuard implements CanActivate {

  constructor(private router: Router,
              private authGuard: Kypo2AuthGuardWithLogin,
              private loadingService: LoadingService,
              private authService: Kypo2AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state))
      .pipe(
        map(canActivate => canActivate ? this.isTraineeOnly() : false),
      );
  }

  private isTraineeOnly(): boolean {
    const roles = this.authService.getRoles();
    if (
      RoleResolver.isTrainingTrainee(roles)
      && !RoleResolver.isTrainingOrganizer(roles)
      && !RoleResolver.isTrainingDesigner(roles)
      && !RoleResolver.isUserAndGroupAdmin(roles)
    ) {
      this.router.navigate([TRAINING_RUN_PATH]);
      return false;
    }
    return true;
  }
}
