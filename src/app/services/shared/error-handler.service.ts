import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SentinelNotification,
  SentinelNotificationResult,
  SentinelNotificationService,
  SentinelNotificationTypeEnum,
} from '@sentinel/layout/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KypoConfig } from '../../utils/config';
import { KypoDynamicEnvironment } from '../../../environments/kypo-dynamic-environment';

@Injectable()
/**
 * Resolves type of error and emits alert with appropriate message
 */
export class ErrorHandlerService {
  constructor(private notificationService: SentinelNotificationService) {}

  /**
   * Handles various error types from different servers and displays alert with user-friendly message
   * @param err http error
   * @param action name of the action button displayed in the notification
   * @param operation description of an operation which caused the error
   */
  emit(err: HttpErrorResponse, operation: string, action?: string): Observable<boolean> {
    const notification: SentinelNotification = {
      type: SentinelNotificationTypeEnum.Error,
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
        .pipe(map((result) => result === SentinelNotificationResult.CONFIRMED));
    }

    const config: KypoConfig = KypoDynamicEnvironment.getConfig();

    if (
      err.url.startsWith(config.trainingApiConfig.trainingBasePath) ||
      err.url.startsWith(config.trainingApiConfig.adaptiveBasePath)
    ) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'Training Agenda';
    } else if (err.url.startsWith(config.userAndGroupApiConfig.userAndGroupRestBasePath)) {
      this.setJavaApiErrorNotification(err, notification);
      notification.source = 'User & Group Agenda';
    } else if (err.url.startsWith(config.sandboxApiConfig.sandboxRestBasePath)) {
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
      .pipe(map((result) => result === SentinelNotificationResult.CONFIRMED));
  }

  private setJavaApiErrorNotification(err: HttpErrorResponse, notification: SentinelNotification) {
    notification.additionalInfo = [err.error.message];
  }

  private setPythonApiErrorToNotification(err: HttpErrorResponse, notification: SentinelNotification) {
    if (err.error.detail) {
      // PYTHON API
      notification.additionalInfo = [err.error.detail];
    } else if (err.error.non_field_errors) {
      // PYTHON API
      notification.additionalInfo = [err.error.non_field_errors];
    }
  }
}
