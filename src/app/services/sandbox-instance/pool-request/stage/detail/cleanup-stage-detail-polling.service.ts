import {StageDetailPollingService} from './stage-detail-polling.service';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {RequestStageType} from 'kypo-sandbox-model';
import {RequestStage} from 'kypo-sandbox-model';
import {map} from 'rxjs/operators';
import {StageDetail} from '../../../../../model/sandbox/stage-detail-adapter';
import {ErrorHandlerService} from '../../../../shared/error-handler.service';
import {StagesApi} from 'kypo-sandbox-api';

@Injectable()
export class CleanupStageDetailPollingService extends StageDetailPollingService {

  constructor(private api: StagesApi,
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
