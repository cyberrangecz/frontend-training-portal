import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertService} from './alert.service';
import {HttpErrorCodesEnum} from '../../model/enums/http-error-codes.enum';

@Injectable()
/**
 * Checks type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  display(err: HttpErrorResponse, operation: string) {
    if (err === null || err === undefined || err.status === 0 || err.error === null || err.error === undefined) {
      this.alertService.emitAlert(
        AlertTypeEnum.Error,
        `${operation} Unknown error. Please check your internet connection or report the issue to developers`
      );
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_404) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} 404 - Not found. Report the issue to developers`);
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_400) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} 400 - Bad request. Report the issue to developers`);
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_401) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} Unauthorized. Try to refresh page or login again`);
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_403) {
      this.alertService.emitAlert(
        AlertTypeEnum.Error,
        `${operation} You may not have access rights to requested resource. Contact system administrator.`
      );
      return;
    }
    if (err.error.message) { // JAVA API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.message}`);
    } else { // PYTHON API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.detail}`);
    }
  }
}
