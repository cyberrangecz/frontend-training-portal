import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Kypo2AuthGuardWithLogin, Kypo2AuthService} from 'kypo2-auth';
import {map, tap} from 'rxjs/operators';
import {CanActivateToObservable} from './can-activate-to-observable';
import {TRAINING_RUN_PATH} from '../../paths';
import {LoadingService} from '../shared/loading.service';

/**
 * If user has only trainee role, redirects him directly to training run agenda
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
    if (this.authService.isTrainingTrainee() && !this.authService.isTrainingOrganizer() && !this.authService.isTrainingDesigner() && !this.authService.isUserAndGroupAdmin()) {
      this.router.navigate([TRAINING_RUN_PATH]);
      return false;
    }
    return true;
  }
}
