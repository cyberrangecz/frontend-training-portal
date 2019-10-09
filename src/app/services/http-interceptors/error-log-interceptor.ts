import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class ErrorLogInterceptor implements HttpInterceptor {

  constructor() {
  }


  /**  Intercepts HTTP requests and logs possible errors
   * @param req http request
   * @param next next http handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {},
      err => {
        if (err instanceof HttpErrorResponse) {
          console.error(err);
        }
      }));
  }
}
