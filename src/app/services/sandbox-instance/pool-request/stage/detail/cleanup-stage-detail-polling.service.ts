import {StageDetailPollingService} from './stage-detail-polling.service';
import {Injectable} from '@angular/core';
import {Observable, pipe, throwError} from 'rxjs';
import {RequestStageType} from '../../../../../model/enums/request-stage-type.enum';
import {RequestStage} from '../../../../../model/sandbox/pool/request/stage/request-stage';
import {SandboxInstanceApi} from '../../../../api/sandbox-instance-api.service';
import {map} from 'rxjs/operators';
import {StageDetail} from '../../../../../model/sandbox/pool/request/stage/stage-detail-adapter';
import {ErrorHandlerService} from '../../../../shared/error-handler.service';

@Injectable()
export class CleanupStageDetailPollingService extends StageDetailPollingService {

  constructor(private api: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getStageDetail(stageId: number, stageType: RequestStageType): Observable<StageDetail> {
    let stage$: Observable<RequestStage>;
    if (stageType === RequestStageType.OPENSTACK_CLEANUP) {
      stage$ = this.api.getOpenstackCleanupStage(stageId);
    } else if (stageType === RequestStageType.ANSIBLE_CLEANUP) {
      stage$ = this.api.getAnsibleCleanupStage(stageId);
    } else {
      return throwError(new Error(`Request stage of type "${stageType}" is not supported by CleanupStageDetailPollingService`));
    }
    return stage$
      .pipe(
        map(stage => new StageDetail(stage),
          err => {
            this.errorHandler.emit(err, `Fetching stage ${stageId} detail`);
            return new StageDetail(undefined, true);
          }),
      )
  }
}
