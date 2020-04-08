import {KypoBaseComponent} from 'kypo-common';
import {OnInit} from '@angular/core';
import {
  Kypo2UserAndGroupErrorService,
  Kypo2UserAndGroupNotificationService,
  Kypo2UserAndGroupRoutingEventService
} from 'kypo2-user-and-group-management';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {takeWhile} from 'rxjs/operators';
import {CsirtMuNotificationService, CsirtMuNotificationTypeEnum} from 'csirt-mu-layout';
import {RouteFactory} from '../../utils/route-factory';

export class AdminBaseComponent extends KypoBaseComponent implements OnInit {

  constructor(protected userAndGroupRouting: Kypo2UserAndGroupRoutingEventService,
              protected userAndGroupNotificationService: Kypo2UserAndGroupNotificationService,
              protected userAndGroupErrorService: Kypo2UserAndGroupErrorService,
              protected router: Router,
              protected notificationService: CsirtMuNotificationService,
              protected errorHandler: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
    this.subscribeUserAndGroupEvents();
  }

  private subscribeUserAndGroupEvents() {
    this.userAndGroupRouting.navigate$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(routeEvent => this.router.navigate([RouteFactory.parseUserAndGroupRouteEvent(routeEvent)]));

    this.userAndGroupNotificationService.notification$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(notification => this.notificationService.emit({ type: CsirtMuNotificationTypeEnum.Success, title: notification.message, source: 'user & group microservice'}));

    this.userAndGroupErrorService.error$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(error => this.errorHandler.emit(error.err, error.action));
  }
}
