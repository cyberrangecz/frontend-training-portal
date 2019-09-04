import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
/**
 * Guard checking if it is possible to access TI detail/edit. Checks if such TI exists and if user has access rights
 */
export class TrainingInstanceGuard implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.paramMap.has('id')) {
      const id = Number(route.paramMap.get('id'));
      return !isNaN(id);
    }
    return false;
  }
}
