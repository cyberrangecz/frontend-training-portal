import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

/**
 * Interceptor creating fake responses for http calls. Used for development and testing
 */
export class TestBackendInterceptor implements HttpInterceptor {


  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match(".*" + environment.trainingDefsEndpointUri + "\\d+") && req.method === 'DELETE') {
      return this.trainingDefDelete(req, next);
    }
    return next.handle(req);
  }

  private trainingDefDelete(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req);
  }
}
