import {StageDetailService} from './stage-detail.service';
import {combineLatest, merge, Observable, Subject, timer} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {retryWhen, switchMap} from 'rxjs/operators';
import {StageDetail} from '../../../../../model/sandbox/stage-detail-adapter';

export abstract  class StageDetailPollingService extends StageDetailService {
  protected retryPolling$: Subject<boolean> = new Subject();

  protected constructor() {
    super();
    this.stageDetails$ = merge(this.createPoll(), this.stageDetailsSubject$.asObservable());
  }

  private createPoll(): Observable<StageDetail[]> {
    return timer(environment.apiPollingPeriod, environment.apiPollingPeriod)
      .pipe(
        switchMap(_ => this.refreshSubscribed()),
        retryWhen(_ => this.retryPolling$),
      );
  }

  private refreshSubscribed(): Observable<StageDetail[]> {
    const stageDetails$ = this.subscribedStageDetails.values()
      .map(stageDetail => this.getStageDetail(stageDetail.stage.id, stageDetail.stage.type, stageDetail.requestedPagination));
    return combineLatest(stageDetails$);
  }
}
