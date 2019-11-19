import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  Kypo2UserAndGroupErrorService,
  Kypo2UserAndGroupNotificationService,
  Kypo2UserAndGroupRoutingEventService
} from 'kypo2-user-and-group-management';
import {Router} from '@angular/router';
import {AlertService} from '../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {AdminBaseComponent} from '../../admin-base-component';

@Component({
  selector: 'kypo2-admin-group-wrapper',
  templateUrl: './admin-group-wrapper.component.html',
  styleUrls: ['./admin-group-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGroupWrapperComponent extends AdminBaseComponent {

  constructor(protected userAndGroupRouting: Kypo2UserAndGroupRoutingEventService,
              protected userAndGroupNotificationService: Kypo2UserAndGroupNotificationService,
              protected userAndGroupErrorService: Kypo2UserAndGroupErrorService,
              protected router: Router,
              protected alertService: AlertService,
              protected errorHandler: ErrorHandlerService) {
    super(userAndGroupRouting, userAndGroupNotificationService, userAndGroupErrorService, router, alertService, errorHandler);
  }
}
