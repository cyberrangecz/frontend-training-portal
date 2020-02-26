import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {AdminBaseComponent} from '../../../admin-base-component';
import {
  Kypo2GroupEditOverviewComponent,
  Kypo2UserAndGroupErrorService,
  Kypo2UserAndGroupNotificationService,
  Kypo2UserAndGroupRoutingEventService
} from 'kypo2-user-and-group-management';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {Group} from 'kypo2-user-and-group-management/lib/model/group/group.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CsirtMuNotificationService} from 'csirt-mu-layout';

/**
 * Main component of group detail administration (for subscription to user and group library observables)
 */
@Component({
  selector: 'kypo2-admin-group-detail-wrapper',
  templateUrl: './admin-group-detail-wrapper.component.html',
  styleUrls: ['./admin-group-detail-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGroupDetailWrapperComponent extends AdminBaseComponent {

  group$: Observable<Group>;

  @ViewChild(Kypo2GroupEditOverviewComponent, { static: true}) groupEditOverviewComponent;

  constructor(protected userAndGroupRouting: Kypo2UserAndGroupRoutingEventService,
              protected userAndGroupNotificationService: Kypo2UserAndGroupNotificationService,
              protected userAndGroupErrorService: Kypo2UserAndGroupErrorService,
              protected router: Router,
              protected notificationService: CsirtMuNotificationService,
              protected errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute) {
    super(userAndGroupRouting, userAndGroupNotificationService, userAndGroupErrorService, router, notificationService, errorHandler);
    this.group$ = this.activeRoute.data.pipe(map(data => data.group));
  }
}
