import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActiveUserService} from "../shared/active-user.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private activeUserService: ActiveUserService) {
  }

  /**
   * Intercepts HTTP requests and adds authorization token
   * @param req http request
   * @param next next http handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({
      headers: req.headers.append('Authorization', this.activeUserService.getActiveUserAuthorizationHeader())
    });
    return next.handle(clonedReq)
      .pipe(tap((event: HttpEvent<any>) => {
      },
          err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log('Unauthorized request');
          }
        }
      }));
  }
}
