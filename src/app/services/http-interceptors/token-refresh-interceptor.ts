import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, EMPTY, Observable, skipWhile, switchMap, take } from 'rxjs';
import { TokenRefreshService, TokenRefreshState } from '../shared/token-refresh.service';
import { SentinelAuthConfig, SentinelAuthService } from '@sentinel/auth';

/**
 * Intercepts http requests, to validate whether the access token is up-to-date.
 *
 * The flow is as follows:
 * 1. The token is not expired → the request is sent.
 * 2. The token is expired → the request is sent after refreshing the token.
 * 3. The token is already being refreshed → the request is sent after refreshing finishes.
 * 4. The token refresh fails → the user is logged out.
 *
 * @note • OIDC requests are not handled, to ensure that the OIDC flow is not interrupted
 * @note • requires {@link TokenRefreshService}
 * @note • requires {@link SentinelAuthService}
 * @note • requires {@link SentinelAuthConfig}
 */
@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
    constructor(
        private tokenRefreshService: TokenRefreshService,
        private sentinelAuthService: SentinelAuthService,
        private sentinelAuthConfig: SentinelAuthConfig,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isOIDCRequest(req)) {
            return next.handle(req);
        }

        return this.handleCurrentState(this.tokenRefreshService.immediateState, next, req);
    }

    private handleCurrentState(
        state: TokenRefreshState,
        next: HttpHandler,
        req: HttpRequest<any>,
    ): Observable<HttpEvent<any>> {
        switch (state) {
            case TokenRefreshState.REFRESHING:
                return this.waitUntilRefreshed(next, req);
            case TokenRefreshState.OK:
                if (this.tokenRefreshService.isTokenExpired() && this.tokenRefreshService.canRefresh()) {
                    return this.refreshAndSend(next, req);
                }
                return next.handle(req);
            case TokenRefreshState.FAILED:
                this.sentinelAuthService.logout();
                return EMPTY;
        }
    }

    private waitUntilRefreshed(next: HttpHandler, req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.tokenRefreshService.stateObservable.pipe(
            skipWhile((state) => state === TokenRefreshState.REFRESHING),
            take(1),
            switchMap((state) =>
                this.handleCurrentState(state, next, this.tokenRefreshService.updateRequestToken(req)),
            ),
        );
    }

    private refreshAndSend(next: HttpHandler, req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.tokenRefreshService.refreshToken().pipe(
            take(1),
            concatMap((state) =>
                this.handleCurrentState(state, next, this.tokenRefreshService.updateRequestToken(req)),
            ),
        );
    }

    private isOIDCRequest(req: HttpRequest<any>): boolean {
        return this.sentinelAuthConfig.providers.some(
            (provider) => provider.oidcConfig?.issuer && req.url.startsWith(provider.oidcConfig?.issuer),
        );
    }
}
