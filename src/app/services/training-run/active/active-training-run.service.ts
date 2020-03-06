import {Injectable} from '@angular/core';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {TrainingInstance} from '../../../model/training/training-instance';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {TrainingRun} from '../../../model/training/training-run';

/**
 * Layer between component and API service. Implement concrete service by extending this class.
 * Provide concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other actions to modify data.
 */
@Injectable()
export abstract class ActiveTrainingRunService extends PaginatedResourceService<TrainingRun> {

  /**
   * Starts polling in regular intervals
   * @param trainingInstance training instance associated with active training runs
   */
  abstract startPolling(trainingInstance: TrainingInstance);

  /**
   * @param trainingInstanceId id of associated training instance
   * @param pagination requested pagination
   */
  abstract getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRun>>;

  /**
   * Deletes sandbox associated with active training run
   * @param trainingRun training run whose sandbox instance should be deleted
   */
  abstract deleteSandbox(trainingRun: TrainingRun): Observable<any>;
}
