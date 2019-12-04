import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {
  Kypo2MicroserviceEditOverviewComponent,
  Kypo2UserAndGroupErrorService,
  Kypo2UserAndGroupNotificationService,
  Kypo2UserAndGroupRoutingEventService
} from 'kypo2-user-and-group-management';
import {Router} from '@angular/router';
import {AlertService} from '../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {AdminBaseComponent} from '../../admin-base-component';

@Component({
  selector: 'kypo2-admin-microservice-wrapper',
  templateUrl: './admin-microservice-wrapper.component.html',
  styleUrls: ['./admin-microservice-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMicroserviceWrapperComponent extends AdminBaseComponent {

  @ViewChild(Kypo2MicroserviceEditOverviewComponent, { static: true }) microserviceEditComponent;

  constructor(protected userAndGroupRouting: Kypo2UserAndGroupRoutingEventService,
              protected userAndGroupNotificationService: Kypo2UserAndGroupNotificationService,
              protected userAndGroupErrorService: Kypo2UserAndGroupErrorService,
              protected router: Router,
              protected alertService: AlertService,
              protected errorHandler: ErrorHandlerService) {
    super(userAndGroupRouting, userAndGroupNotificationService, userAndGroupErrorService, router, alertService, errorHandler);
  }
}
