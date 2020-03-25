import {BehaviorSubject, Observable} from 'rxjs';
import {RequestStage} from '../../../../../model/sandbox/pool/request/stage/request-stage';
import {Dictionary} from 'typescript-collections';
import {tap} from 'rxjs/operators';
import {RequestStageType} from '../../../../../model/enums/request-stage-type.enum';
import {StageDetail} from '../../../../../model/sandbox/pool/request/stage/stage-detail-adapter';
import {KypoRequestedPagination} from 'kypo-common';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to stageDetail$ to receive latest data updates.
 */
export abstract class StageDetailService {

  protected subscribedStageDetails: Dictionary<number, StageDetail> = new Dictionary();

  protected stageDetailsSubject$: BehaviorSubject<StageDetail[]> = new BehaviorSubject([]);

  /**
   * @contract must be updated every time new data are received
   */
  stageDetails$: Observable<StageDetail[]> = this.stageDetailsSubject$.asObservable();

  /**
   * Adds a stage to a list of subscribed stages (to get its details)
   * @param stage a stage to subscribe
   * @param optional requested pagination if needed
   */
  add(stage: RequestStage, pagination?: KypoRequestedPagination): Observable<any> {
    return this.getStageDetail(stage.id, stage.type, pagination)
      .pipe(
        tap(
          stageDetail => {
            this.subscribedStageDetails.setValue(stageDetail.stage.id, stageDetail);
            return this.stageDetailsSubject$.next(this.subscribedStageDetails.values());
          },
          _ => {
            return this.stageDetailsSubject$.next(this.subscribedStageDetails.values());
          })
      );
  }

  /**
   * Removes a stage from a list of subscribed stages (to stop getting its details)
   * @param stage a stage to unsubscribe
   */
  remove(stage: RequestStage): void {
    this.subscribedStageDetails.remove(stage.id);
  }

  /**
   * @param stageId id of stage
   * @param stageType type of stage
   * @param pagination requested pagination
   */
  abstract getStageDetail(stageId: number, stageType: RequestStageType, pagination?: KypoRequestedPagination): Observable<StageDetail>;
}
