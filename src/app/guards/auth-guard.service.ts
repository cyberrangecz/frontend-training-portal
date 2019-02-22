import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";
import {OAuthService} from 'angular-oauth2-oidc';
import {map} from "rxjs/operators";
import {User} from "../model/user/user";
@Injectable()
/**
 * Guard which determines if user is signed in and can access private resources.
 */
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private activeUserService: ActiveUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.hasValidTokens()) {
      if (this.hasSomeUserRole()) {
        this.navigateToTraineeRouteIfHasOnlyTraineeRole();
        return Promise.resolve(true);
      }
      return this.canLoadUserRoles();
    }
    return this.canRetrieveTokensFromOIDCServer();
  }

  private hasSomeUserRole(): boolean {
    return this.activeUserService.getRolesCount() > 0;
  }

  private canRetrieveTokensFromOIDCServer(): Promise<boolean> {
    return this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        return this.hasValidTokens();
      })
      .then(validTokens => {
        if (validTokens) {
          return this.canLoadUserRoles();
        }
        return validTokens;
      });
  }

  private hasValidTokens(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }

  private canLoadUserRoles(): Promise<boolean> {
    //TODO: multiple calls might be needed if user is being created for the first time
    return this.activeUserService.loadUserAndHisRoles()
      .pipe(map((user: User) => {
        this.navigateToTraineeRouteIfHasOnlyTraineeRole();
        return true;
      }))
      .toPromise();
  }

  private navigateToTraineeRouteIfHasOnlyTraineeRole() {
    if (this.activeUserService.isTraineeOnly()) {
      this.router.navigate(['trainee']);
    }
  }
}
