import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertService} from './alert.service';
import {HttpErrorCodesEnum} from '../../model/enums/http-error-codes.enum';

@Injectable()
/**
 * Resolves type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  /**
   * Handles various error types from different servers and displays alert with user-friendly message
   * @param err http error
   * @param operation description of an operation which caused the error
   */
  display(err: HttpErrorResponse, operation: string) {
    if (err === null || err === undefined || err.status === 0 || err.error === null || err.error === undefined) {
      this.alertService.emitAlert(
        AlertTypeEnum.Error,
        `${operation} Unknown error. Please check your internet connection or report the issue to developers`
      );
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_404) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} 404 - Not found. Please report the issue to developers`);
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
    } else if (err.error.detail) { // PYTHON API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.detail}`);
    } else if (err.error.non_field_errors) { // PYTHON API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.non_field_errors}`);
    } else { // UNKNOWN API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with unsupported message. Please report this to developers`);
    }
  }
}
