import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Kypo2AuthGuardWithLogin, Kypo2AuthService} from 'kypo2-auth';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {HOME_PATH} from '../../paths';
import {CanActivateToObservable} from './can-activate-to-observable';

@Injectable()
/**
 * Route guard determining if user is signed in and has role of a trainee.
 */
export class TraineeGuard implements CanActivate {

  constructor(private router: Router,
              private authGuard: Kypo2AuthGuardWithLogin,
              private authService: Kypo2AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state))
      .pipe(
        map(canActivate => canActivate ? this.isTrainee() : false)
      );
  }

  private isTrainee(): boolean {
    if (this.authService.isTrainingTrainee()) {
      return true;
    }
    this.router.navigate([HOME_PATH]);
    return false;
  }
}
