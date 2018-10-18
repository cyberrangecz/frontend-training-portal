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
import {ActiveUserService} from "../services/active-user.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private activeUser: ActiveUserService) {
  }

  /**
   * Intercepts HTTP requests and adds authorization token
   * @param req http request
   * @param next next http handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeUser) {
      const clonedReq = req.clone({
        headers: req.headers.append('Authorization', this.activeUser.getActiveUserAuthorizationHeader())
      });
      return next.handle(clonedReq)
        .pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
            err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['login']);
            }
          }
        }));
    }
    return next.handle(req);
  }
}
