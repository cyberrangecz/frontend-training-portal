import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AlertService} from '../shared/alert.service';

@Injectable()
export class ErrorLogInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {
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
