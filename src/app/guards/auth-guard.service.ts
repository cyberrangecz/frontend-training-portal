import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ActiveUserService} from "../services/active-user.service";
import {Observable} from "rxjs/internal/Observable";
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
/**
 * Guard which determines if user is signed in and can access private resources.
 */
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private oauthService: OAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oauthService.hasValidIdToken()) {
      return Promise.resolve(true);
    }

    return this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(_ => {
        return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
      })
      .then(valid => {
        if (!valid) {
          this.router.navigate(['/unauthorized']);
        }
        return valid;
      });

  }
}
