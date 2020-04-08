import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CsirtMuNotification, CsirtMuNotificationService, CsirtMuNotificationTypeEnum} from 'csirt-mu-layout';
import {environment} from '../../../environments/environment';

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
    if (err.status === 401) {
      notification.additionalInfo = ['Unauthorized. Try to refresh page or login again', err?.message];
      this.notificationService.emit(notification);
      return;
    }
    if (err.status === 403) {
      notification.additionalInfo = ['You may not have access rights to requested resource. Contact system administrator.', err?.message];
      this.notificationService.emit(notification);
      return;
    }
    if (err.url.startsWith(environment.trainingApiConfig.trainingBasePath)) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'Training Agenda';
    } else if (err.url.startsWith(environment.kypo2UserAndGroupConfig.userAndGroupRestBasePath)) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'User & Group Agenda';
    } else if (err.url.startsWith(environment.sandboxApiConfig.sandboxRestBasePath)) {
      this.setPythonApiErrorToNotification(err, notification)
      notification.source = 'Sandbox Agenda';
    } else { // UNKNOWN API
      notification.additionalInfo = ['Failed with unsupported error message. Please report the following message to developers', err?.message?.toString()];
    }
    this.notificationService.emit(notification);
  }

  private setJavaApiErrorNotification(err: HttpErrorResponse, notification: CsirtMuNotification) {
    notification.additionalInfo = [err.error.message];
  }

  private setPythonApiErrorToNotification(err: HttpErrorResponse, notification: CsirtMuNotification) {
    if (err.error.detail) { // PYTHON API
      notification.additionalInfo = [err.error.detail];
    } else if (err.error.non_field_errors) { // PYTHON API
      notification.additionalInfo = [err.error.non_field_errors];
    }
  }
}
