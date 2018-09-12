import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AlertService} from "../services/event-services/alert.service";
import {Injectable} from "@angular/core";
import {AlertTypeEnum} from "../enums/alert-type.enum";
import {environment} from "../../environments/environment";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(
      (event) => {},
    (err) => {
        if (err instanceof HttpErrorResponse) {
          this.alertService.emitAlert(AlertTypeEnum.Error, 'hello', environment.defaultAlertDuration);
        }
      }
    ))
  }
}
