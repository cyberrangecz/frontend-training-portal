import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActiveUserService} from "../services/active-user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private activeUser: ActiveUserService) {
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
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
