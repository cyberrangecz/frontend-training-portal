import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';

@Injectable()
/**
 * Checks type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(private alertService: AlertService) {
  }

  display(err: HttpErrorResponse, operation: string) {
    if (err.status === 0 && err.error.message === '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} No response. Report the issue to developers`);
      return;
    }
    if (err.status === 404) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} 404 - Not found. Report the issue to developers`);
      return;
    }
    if (err.status === 400) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} 400 - Bad request. Report the issue to developers`);
      return;
    }
    if (err.status === 401) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} Unauthorized. Try to refresh page or login again`);
      return;
    }
    if (err.status === 403) {
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} You may not have access rights to requested resource. Contact system administrator.`);
      return;
    }
    if (err.error.message) { // JAVA API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.message}`);
    } else { // PYTHON API
      this.alertService.emitAlert(AlertTypeEnum.Error, `${operation} failed with following message: ${err.error.detail}`);
    }
  }
}
