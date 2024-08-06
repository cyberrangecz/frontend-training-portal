import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, skipWhile, switchMap, take } from 'rxjs';
import { TokenRefreshService } from '../shared/token-refresh.service';
import { catchError } from 'rxjs/operators';

/**
 * Intercepts http requests, in case of 401 response, refreshes the token and
 * retries the request
 *
 * If token is being refreshed at the moment, request is postponed until
 * refresh is finished
 */
@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  constructor(private tokenRefreshService: TokenRefreshService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenRefreshService.isRefreshing$.pipe(
      skipWhile((isRefreshing) => isRefreshing),
      take(1),
      () => {
        return next.handle(req).pipe(
          (_) => _,
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return this.tokenRefreshService.refreshToken().pipe(
                switchMap((success) => {
                  if (success) {
                    console.log('Token refreshed, retrying request...');
                    return next.handle(req);
                  }
                  throw error;
                })
              );
            }
            throw error;
          })
        );
      }
    );
  }
}
