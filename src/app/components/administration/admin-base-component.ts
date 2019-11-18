import {BaseComponent} from '../base.component';
import {OnInit} from '@angular/core';
import {
  Kypo2UserAndGroupErrorService,
  Kypo2UserAndGroupNotificationService,
  Kypo2UserAndGroupRoutingEventService
} from 'kypo2-user-and-group-management';
import {Router} from '@angular/router';
import {AlertService} from '../../services/shared/alert.service';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {takeWhile} from 'rxjs/operators';
import {RouteFactory} from '../../model/routes/route-factory';

export class AdminBaseComponent extends BaseComponent implements OnInit {

  constructor(protected userAndGroupRouting: Kypo2UserAndGroupRoutingEventService,
              protected userAndGroupNotificationService: Kypo2UserAndGroupNotificationService,
              protected userAndGroupErrorService: Kypo2UserAndGroupErrorService,
              protected router: Router,
              protected alertService: AlertService,
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
      .subscribe(notification => this.alertService.emitAlert(notification.type, notification.message));

    this.userAndGroupErrorService.error$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(error => this.errorHandler.display(error.err, error.action));
  }
}
