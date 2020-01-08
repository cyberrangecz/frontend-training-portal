import {StageDetailService} from './stage-detail.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, merge, Observable, Subject, timer} from 'rxjs';
import {StageDetail} from '../../../../model/sandbox/pool/request/stage/stage-detail';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {map, retryWhen, switchMap, tap} from 'rxjs/operators';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {Dictionary} from 'typescript-collections';
import {environment} from '../../../../../environments/environment';
import {RequestStageType} from '../../../../model/enums/request-stage-type.enum';

/**
 * Service extending stage detail service of polling behaviour.
 * Stages must bust be first subscribed to be added to a list of polled stages.
 */
@Injectable()
export class StageDetailPollingService extends StageDetailService {

  private retryPolling$: Subject<boolean> = new Subject();
  private stageDetailsSubject$: BehaviorSubject<StageDetail[]> = new BehaviorSubject([]);
  private subscribedStageDetails: Dictionary<number, StageDetail> = new Dictionary();

  /**
   * Emits received data with every new poll response
   */
  stageDetail$: Observable<StageDetail[]>;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi) {
    super();
    this.stageDetail$ = merge(this.createPoll(), this.stageDetailsSubject$.asObservable());
  }

  /**
   * Adds a stage to a list of polled stages
   * @param stage a stage to add to a list of polled stages
   */
  subscribe(stage: RequestStage): Observable<any> {
    return this.getStageOutputRequest(stage.id, stage.type)
      .pipe(
        tap(
          stageDetail => {
            return this.stageDetailsSubject$.next(this.subscribedStageDetails.values());
            },
            stageDetail => {
            return this.stageDetailsSubject$.next(this.subscribedStageDetails.values());
        })
      );
  }

  /**
   * Removes a stage from a list of polled stages
   * @param stage a stage to removed from a list of polled stages
   */
  unsubscribe(stage: RequestStage) {
    this.subscribedStageDetails.remove(stage.id);
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
      .map(stageDetail => this.getStageOutputRequest(stageDetail.stageId, stageDetail.type));
    return forkJoin(stageDetails$);
  }

  private getStageOutputRequest(stageId: number, stageType: RequestStageType): Observable<StageDetail> {
    let stageOutput$: Observable<string[]>;
    if (stageType === RequestStageType.OPENSTACK) {
      stageOutput$ = this.sandboxInstanceFacade.getOpenstackStageOutput(stageId);
    }
    if (stageType === RequestStageType.ANSIBLE_RUN) {
      stageOutput$ = this.sandboxInstanceFacade.getAnsibleStageOutput(stageId);
    }
    const stageDetail = new StageDetail();
    stageDetail.stageId = stageId;
    stageDetail.type = stageType;
    return stageOutput$
      .pipe(
        map(
          output => {
            stageDetail.output = output;
            this.subscribedStageDetails.setValue(stageDetail.stageId, stageDetail);
            return stageDetail;
          },
            err => {
            stageDetail.hasError = true;
            this.subscribedStageDetails.setValue(stageDetail.stageId, stageDetail);
            return stageDetail;
          }
        )
      );
  }
}
