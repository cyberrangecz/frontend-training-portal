import { Injectable } from '@angular/core';
import { SentinelAuthService } from '@sentinel/auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
/**
 * Emits events if some global loading starts or ends
 */
export class TokenRefreshService {
  private _isRefreshingSubject: Subject<boolean> = new BehaviorSubject(false);
  isRefreshing$ = this._isRefreshingSubject.asObservable();

  private readonly EXPIRATION_KEY = 'expires_at';

  constructor(private authService: SentinelAuthService, private oauthService: OAuthService) {}

  refreshToken(): Observable<boolean> {
    if (
      localStorage.getItem(this.EXPIRATION_KEY) &&
      new Date().getTime().valueOf() > parseInt(localStorage.getItem(this.EXPIRATION_KEY) as string)
    ) {
      this.setRefreshing(true);

      return from(
        this.oauthService.refreshToken().then(
          () => {
            this.setRefreshing(false);
            return true;
          },
          () => {
            this.setRefreshing(false);
            this.authService.logout();
            return false;
          }
        )
      );
    }
    this.setRefreshing(false);
    return of(true);
  }

  private setRefreshing(value: boolean): void {
    this._isRefreshingSubject.next(value);
  }
}
