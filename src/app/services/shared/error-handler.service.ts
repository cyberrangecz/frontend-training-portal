import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  CsirtMuNotification,
  CsirtMuNotificationResult,
  CsirtMuNotificationService,
  CsirtMuNotificationTypeEnum,
} from 'csirt-mu-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KypoConfig } from '../../utils/config';
import { APP_CONFIG } from './config.provider';

@Injectable()
/**
 * Resolves type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(
    private notificationService: CsirtMuNotificationService,
    @Inject(APP_CONFIG) private appConfig: KypoConfig
  ) {}

  /**
   * Handles various error types from different servers and displays alert with user-friendly message
   * @param err http error
   * @param action name of the action button displayed in the notification
   * @param operation description of an operation which caused the error
   */
  emit(err: HttpErrorResponse, operation: string, action?: string): Observable<boolean> {
    const notification: CsirtMuNotification = {
      type: CsirtMuNotificationTypeEnum.Error,
      title: operation,
    };
    if (action !== undefined) {
      notification.action = action;
    }
    if (err === null || err === undefined || err.status === 0 || err.error === null || err.error === undefined) {
      notification.additionalInfo = [
        'Unknown error. Please check your internet connection or report the issue to developers',
        err?.message,
      ];
      return this.notificationService
        .emit(notification)
        .pipe(map((result) => result === CsirtMuNotificationResult.CONFIRMED));
    }
    if (err.url.startsWith(this.appConfig.trainingApiConfig.trainingBasePath)) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'Training Agenda';
    } else if (err.url.startsWith(this.appConfig.userAndGroupApiConfig.userAndGroupRestBasePath)) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'User & Group Agenda';
    } else if (err.url.startsWith(this.appConfig.sandboxApiConfig.sandboxRestBasePath)) {
      this.setPythonApiErrorToNotification(err, notification);
      notification.source = 'Sandbox Agenda';
    } else {
      // UNKNOWN API
      notification.additionalInfo = [
        'Failed with unsupported error message. Please report the following message to developers',
        err?.message?.toString(),
      ];
    }

    return this.notificationService
      .emit(notification)
      .pipe(map((result) => result === CsirtMuNotificationResult.CONFIRMED));
  }

  private setJavaApiErrorNotification(err: HttpErrorResponse, notification: CsirtMuNotification) {
    notification.additionalInfo = [err.error.message];
  }

  private setPythonApiErrorToNotification(err: HttpErrorResponse, notification: CsirtMuNotification) {
    if (err.error.detail) {
      // PYTHON API
      notification.additionalInfo = [err.error.detail];
    } else if (err.error.non_field_errors) {
      // PYTHON API
      notification.additionalInfo = [err.error.non_field_errors];
    }
  }
}
