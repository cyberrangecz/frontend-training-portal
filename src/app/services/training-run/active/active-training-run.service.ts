import {Injectable} from '@angular/core';
import {KypoPaginatedResourceService} from 'kypo-common';
import {Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from '../../../model/training/training-instance';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingRun} from '../../../model/training/training-run';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
@Injectable()
export abstract class ActiveTrainingRunService extends KypoPaginatedResourceService<TrainingRun> {

  /**
   * Starts polling in regular intervals
   * @param trainingInstance training instance associated with active training runs
   */
  abstract startPolling(trainingInstance: TrainingInstance);

  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(trainingInstanceId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<TrainingRun>>;

  /**
   * Deletes sandbox associated with active training run
   * @param trainingRun training run whose sandbox instance should be deleted
   */
  abstract deleteSandbox(trainingRun: TrainingRun): Observable<any>;
}
