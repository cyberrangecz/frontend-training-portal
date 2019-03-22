import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";
import {OAuthService} from 'angular-oauth2-oidc';
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";
@Injectable()
/**
 * Guard which determines if user is signed in and can access private resources.
 */
export class AuthGuard implements CanActivate {

  readonly MAX_REST_API_REQUEST_ATTEMPTS = 3;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private activeUserService: ActiveUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.hasValidTokens()) {
      if (this.hasSomeUserRole()) {
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
      .then(hasValidTokens => {
        if (hasValidTokens)
          return this.canLoadUserRoles();
        else
          return false;
      })
      .then(isAuthenticated => {
        if (isAuthenticated) {
          this.oauthService.setupAutomaticSilentRefresh();
          return true
        }
        else
          return false;
      });
  }

  private hasValidTokens(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }

  private canLoadUserRoles(): Promise<boolean> {
    return this.tryLoadUserAndRole().toPromise();
  }

  private tryLoadUserAndRole(attemptCount: number = 0): Observable<boolean> {
    return this.activeUserService.loadUserInfo()
      .pipe(switchMap(() => {
        if (this.canAccessAfterMultipleAttempts(attemptCount)) {
          this.navigateToTraineeRouteIfHasOnlyTraineeRole();
          return of(true);
        } else
          return of(false)
      }),
        catchError(() => {
          if (this.canRetryRoleRequest(attemptCount))
            return this.tryLoadUserAndRole(++attemptCount);
          else
            return of(false)
        })
      );
  }

  private canAccessAfterMultipleAttempts(loadRoleAttempts: number): Observable<boolean> {
    if (this.hasSomeUserRole()) {
      return of(true);
    }
    else if (this.canRetryRoleRequest(loadRoleAttempts))
      return this.tryLoadUserAndRole(++loadRoleAttempts)
  }

  private navigateToTraineeRouteIfHasOnlyTraineeRole() {
    if (this.activeUserService.isTraineeOnly()) {
      this.router.navigate(['trainee']);
    }
  }

  private canRetryRoleRequest(loadRoleAttempts: number): boolean {
    return loadRoleAttempts < this.MAX_REST_API_REQUEST_ATTEMPTS;
  }
}
