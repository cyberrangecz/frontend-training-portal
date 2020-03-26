import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpErrorCodesEnum} from '../../model/enums/http-error-codes.enum';
import {CsirtMuNotification, CsirtMuNotificationService, CsirtMuNotificationTypeEnum} from 'csirt-mu-layout';
import {JavaApiError} from '../../model/DTOs/other/java-api-error';

@Injectable()
/**
 * Resolves type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(private notificationService: CsirtMuNotificationService) {
  }

  /**
   * Handles various error types from different servers and displays alert with user-friendly message
   * @param err http error
   * @param operation description of an operation which caused the error
   * @param source source of the error
   */
  emit(err: HttpErrorResponse, operation: string, source?: string) {
    const notification: CsirtMuNotification = {
      type: CsirtMuNotificationTypeEnum.Error,
      title: operation,
      source: source
    };
    if (err === null || err === undefined || err.status === 0 || err.error === null || err.error === undefined) {
      notification.additionalInfo = ['Unknown error. Please check your internet connection or report the issue to developers', err?.message];
      this.notificationService.emit(notification);
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_401) {
      notification.additionalInfo = ['Unauthorized. Try to refresh page or login again', err?.message];
      this.notificationService.emit(notification);
      return;
    }
    if (err.status === HttpErrorCodesEnum.ERROR_403) {
      notification.additionalInfo = ['You may not have access rights to requested resource. Contact system administrator.', err?.message];
      this.notificationService.emit(notification);
      return;
    }
    if (err.error instanceof JavaApiError) {
      notification.additionalInfo = [err.error.toString()];
      this.notificationService.emit(notification);
    } else if (err.error.detail) { // PYTHON API
      notification.additionalInfo = [err.error.detail];
      this.notificationService.emit(notification);
    } else if (err.error.non_field_errors) { // PYTHON API
      notification.additionalInfo = [err.error.non_field_errors];
      this.notificationService.emit(notification);
    } else { // UNKNOWN API
      notification.additionalInfo = ['Failed with unsupported error message. Please report the following message to developers', err?.message?.toString()];
      this.notificationService.emit(notification);
    }
  }
}
