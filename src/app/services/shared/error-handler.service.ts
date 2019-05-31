import {Injectable} from "@angular/core";
import {AlertService} from "./alert.service";
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AlertTypeEnum} from "../../model/enums/alert-type.enum";

@Injectable()
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  displayInAlert(err: HttpErrorResponse, operation: string) {
    if (err.status === 404 || err.status === 0) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} Wrong request. Report the issue to developers`);
    }
    if (err.status === 401) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} Unauthorized. Try to refresh page or login again`);
    }
    if (err.status === 403) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} You may not have access rights to requested resource. Contact system administrator.`);
    }
    this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.message}`);
  }
}
