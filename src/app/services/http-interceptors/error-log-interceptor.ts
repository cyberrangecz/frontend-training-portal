import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
/**
 * Intercepts HTTP requests and logs error responses to console
 */
export class ErrorLogInterceptor implements HttpInterceptor {
    /**  Intercepts HTTP requests and logs error responses to console
     * @param req http request
     * @param next next http handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                (_) => _,
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        console.error(err);
                    }
                },
            ),
        );
    }
}
