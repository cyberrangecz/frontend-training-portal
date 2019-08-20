import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Kypo2AuthGuardWithLogin, Kypo2AuthService} from 'kypo2-auth';
import {CanActivateToObservable} from "./can-activate-to-observable";
import {map} from "rxjs/operators";
import {HOME_PATH} from "../../paths";

@Injectable()
/**
 * Guard which determines if user is signed in and has role of organizer.
 */
export class OrganizerGuard implements CanActivate {

  constructor(private router: Router,
    private authGuard: Kypo2AuthGuardWithLogin,
    private authService: Kypo2AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return CanActivateToObservable.convert(this.authGuard.canActivate(route, state))
      .pipe(
        map(canActivate => canActivate ? this.isOrganizer() : false)
      );
  }

  private isOrganizer(): boolean {
    if (this.authService.isTrainingOrganizer()) {
      return true;
    }
    this.router.navigate([HOME_PATH]);
    return false;
  }
}
