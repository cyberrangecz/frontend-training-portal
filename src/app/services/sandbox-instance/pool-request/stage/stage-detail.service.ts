import {Observable} from 'rxjs';
import {StageDetail} from '../../../../model/sandbox/pool/request/stage/stage-detail';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * Subscribe to stageDetail$ to receive latest data updates.
 */
export abstract class StageDetailService {
  /**
   * @contract must be updated every time new data are received
   */
  abstract stageDetail$: Observable<StageDetail[]>;

  /**
   * Adds a stage to a list of subscribed stages (to get its details)
   * @param stage a stage to subscribe
   */
  abstract subscribe(stage: RequestStage): Observable<any>;

  /**
   * Removes a stage from a list of subscribed stages (to stop getting its details)
   * @param stage a stage to unsubscribe
   */
  abstract unsubscribe(stage: RequestStage);
}
