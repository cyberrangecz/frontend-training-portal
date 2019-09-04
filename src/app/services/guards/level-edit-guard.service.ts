import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {ADD_LEVEL_PATH, LEVELS_PATH} from '../../components/training-definition/training-definition-overview/paths';
import {TrainingDefinition} from '../../model/training/training-definition';

/**
 * Guard which determines if id of level that user is trying to access is valid.
 * POSSIBLE REDIRECTS:
 * No level id, TD has levels -> id of first level
 * No level id, TD has no levels -> add new level
 */
@Injectable()
export class LevelEditGuard implements CanActivate {
  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.trainingDefinitionFacade.getById(Number(route.paramMap.get('id')), true)
      .pipe(
        map(td => {
          if (state.url.endsWith(ADD_LEVEL_PATH) && td.hasLevels()) {
            this.navigateToFistLevelFromAdd(state.url, td);
            return false;
          }
          if (state.url.endsWith(ADD_LEVEL_PATH) && !td.hasLevels()) {
            return true;
          }
          if (state.url.endsWith(LEVELS_PATH) && td.hasLevels()) {
            this.navigateToFirstLevel(state.url, td);
            return false;
          }
          if (state.url.endsWith(LEVELS_PATH) && !td.hasLevels()) {
            this.navigateToAddLevel(state.url);
            return false;
          }
          return this.hasCorrectLevelId(route, td);
        })
      );
  }

  private navigateToFistLevelFromAdd(url: string, td: TrainingDefinition) {
    this.router.navigate([this.parseUrl(url, '../' + td.levels[0].id)]);
  }

  private navigateToFirstLevel(url: string, td: TrainingDefinition) {
    this.router.navigate([this.parseUrl(url, td.levels[0].id.toString())]);
  }

  private navigateToAddLevel(url: string) {
    this.router.navigate([this.parseUrl(url, ADD_LEVEL_PATH)]);
  }

  private hasCorrectLevelId(route: ActivatedRouteSnapshot, td: TrainingDefinition): boolean {
    const levelId = Number(route.paramMap.get('levelId'));
    if (!Number.isNaN(levelId)) {
      return td.levels.some(level => level.id === levelId);
    } else {
      return false;
    }
  }

  // workaround because of issue with relative navigation in guards. https://github.com/angular/angular/issues/22763
  private parseUrl(url: string, redirectTo: string) {
    const urlTokens = url.split('/');
    const redirectToTokens = redirectTo.split('/');

    let token = redirectToTokens.shift();

    while (token) {
      if (token !== '.' && token !== '..') {
        redirectToTokens.unshift(token);
        break;
      }

      if (token === '..') {
        urlTokens.pop();
      }

      token = redirectToTokens.shift();
    }

    urlTokens.push(...redirectToTokens);
    return urlTokens.join('/');
  }
}
